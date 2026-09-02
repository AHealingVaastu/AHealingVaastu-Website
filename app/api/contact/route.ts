import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  propertyType?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Belt-and-suspenders against email header injection: reject any control
// character before it ever reaches an email header (from/replyTo/subject).
// JS's regex `$` quirk allows a trailing "\n" past EMAIL_RE above, so this
// check is not redundant.
const HAS_CONTROL_CHARS = /[\r\n\0]/;

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const service = (body.service || "").trim();
  const propertyType = (body.propertyType || "").trim();
  const message = (body.message || "").trim();

  if (!firstName || !lastName) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!service) return NextResponse.json({ error: "Please select a service." }, { status: 400 });
  // firstName/lastName/email all flow into email headers (subject, replyTo) below.
  if (HAS_CONTROL_CHARS.test(firstName) || HAS_CONTROL_CHARS.test(lastName) || HAS_CONTROL_CHARS.test(email)) {
    return NextResponse.json({ error: "Please remove any unusual characters and try again." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Service", service],
    ["Property type", propertyType || "Not provided"],
    ["Message", message || "Not provided"],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2A0E3D">
      <h2 style="color:#8B6914">New consultation request · A Healing Vaastu</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;width:130px;vertical-align:top">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
    </div>`;

  // Spacemail (Spaceship's email hosting) SMTP — sends via the mailbox you
  // already own on the domain, so no third-party email service is needed.
  const smtpHost = process.env.SMTP_HOST || "mail.spacemail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER; // the account SMTP authenticates as
  const smtpPassword = process.env.SMTP_PASSWORD; // that account's password
  // Display "From" address — defaults to smtpUser, but can be a different
  // alias on the same mailbox (e.g. authenticate as the primary account,
  // send "from" a friendlier alias like bookings@yourdomain.com).
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const to = process.env.CONTACT_TO_EMAIL || "contact@ahealingvaastu.com";

  // No SMTP credentials configured — validate + log so the form still works
  // in local dev without secrets.
  if (!smtpUser || !smtpPassword) {
    console.info("[contact] (no SMTP_USER/SMTP_PASSWORD) new submission:", { firstName, lastName, email, phone, service, propertyType, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user: smtpUser, pass: smtpPassword },
    });

    await transporter.sendMail({
      from: `A Healing Vaastu <${smtpFrom}>`,
      to,
      replyTo: email,
      subject: `New consultation request: ${firstName} ${lastName}`,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] email send failed:", err);
    return NextResponse.json({ error: "We couldn't send your message right now. Please email us directly." }, { status: 502 });
  }
}
