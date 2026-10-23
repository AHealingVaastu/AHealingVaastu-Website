import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { serviceOptions, propertyOptions } from "@/lib/content";
import { acknowledgementEmail, notificationEmail } from "@/lib/email";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  propertyType?: string;
  message?: string;
  /** honeypot: hidden from people, filled in by bots */
  website?: string;
};

// Best-effort limit of 5 submissions per 10 minutes per IP. The acknowledgement
// email goes to whatever address is typed in, so this stops the form being used
// to send repeated mail to strangers.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Belt-and-suspenders against email header injection: reject any control
// character before it ever reaches an email header (from/replyTo/subject).
// JS's regex `$` quirk allows a trailing "\n" past EMAIL_RE above, so this
// check is not redundant.
const HAS_CONTROL_CHARS = /[\r\n\0]/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // bots fill the hidden field; pretend success so they move on
  if ((body.website || "").trim()) return NextResponse.json({ ok: true });

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const service = (body.service || "").trim();
  const propertyType = (body.propertyType || "").trim();
  const message = (body.message || "").trim();

  if (!firstName || !lastName) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  const serviceLabel = serviceOptions.find((o) => o.value === service)?.label;
  if (!serviceLabel) return NextResponse.json({ error: "Please select a service." }, { status: 400 });
  const propertyLabel = propertyOptions.find((o) => o.value === propertyType)?.label || "";
  // firstName/lastName/email all flow into email headers (subject, replyTo) below.
  if (HAS_CONTROL_CHARS.test(firstName) || HAS_CONTROL_CHARS.test(lastName) || HAS_CONTROL_CHARS.test(email)) {
    return NextResponse.json({ error: "Please remove any unusual characters and try again." }, { status: 400 });
  }

  // counted only once the form is valid, so fixing typos never locks anyone out
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const enquiry = { firstName, lastName, email, phone, serviceValue: service, service: serviceLabel, propertyType: propertyLabel, message };

  // Spacemail (Spaceship's email hosting) SMTP — sends via the mailbox you
  // already own on the domain, so no third-party email service is needed.
  const smtpHost = process.env.SMTP_HOST || "mail.spacemail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER; // the account SMTP authenticates as
  const smtpPassword = process.env.SMTP_PASSWORD; // that account's password
  // Address client-facing emails come from, e.g. a bookings@ alias of the mailbox.
  // Notifications to the business always come from smtpUser itself.
  const clientFrom = process.env.SMTP_FROM || smtpUser;
  const to = process.env.CONTACT_TO_EMAIL || "contact@ahealingvaastu.com";

  // No SMTP credentials configured — validate + log so the form still works
  // in local dev without secrets.
  if (!smtpUser || !smtpPassword) {
    console.info("[contact] (no SMTP_USER/SMTP_PASSWORD) new submission:", enquiry);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    const note = notificationEmail(enquiry);
    await transporter.sendMail({
      from: { name: `${firstName} ${lastName} via A Healing Vaastu`, address: smtpUser },
      to,
      replyTo: { name: `${firstName} ${lastName}`, address: email },
      subject: note.subject,
      html: note.html,
      text: note.text,
    });
  } catch (err) {
    console.error("[contact] email send failed:", err);
    return NextResponse.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  // The enquiry has reached the business; a failed acknowledgement is only logged.
  try {
    const ack = acknowledgementEmail(enquiry);
    await transporter.sendMail({
      from: { name: "Anjli Gupta from A Healing Vaastu", address: clientFrom || smtpUser },
      to: { name: `${firstName} ${lastName}`, address: email },
      replyTo: to,
      subject: ack.subject,
      html: ack.html,
      text: ack.text,
    });
  } catch (err) {
    console.error("[contact] acknowledgement send failed:", err);
  }

  return NextResponse.json({ ok: true, delivered: true });
}
