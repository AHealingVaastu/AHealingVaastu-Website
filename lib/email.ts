// Email templates for the contact form. Email clients ignore web fonts and most CSS,
// so these use tables, inline styles and a Helvetica stack with the site's colours.
import { business } from "@/lib/content";

const SITE = "https://ahealingvaastu.com";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const C = {
  page: "#FBF5EC",
  card: "#FFFFFF",
  ink: "#2A0E3D",
  plum: "#7B3F8C",
  muted: "#6B4C35",
  faint: "#A07860",
  line: "#EFE6F1",
  tint: "#F7F0F8",
};

export type Enquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  message: string;
};

export function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

/** Escaped text with line breaks kept. */
const para = (s: string) => esc(s).replace(/\n/g, "<br />");

function layout({ preheader, eyebrow, title, intro, body }: { preheader: string; eyebrow: string; title: string; intro: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr><td align="center" style="padding:32px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <tr><td style="padding:0 8px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;"><img src="${SITE}/logo.png" width="44" height="44" alt="A Healing Vaastu" style="display:block;border:0;border-radius:12px;" /></td>
          <td style="vertical-align:middle;padding-left:12px;font-family:${FONT};font-size:15px;line-height:18px;font-weight:700;color:${C.ink};">A Healing<br />Vaastu</td>
        </tr></table>
      </td></tr>
      <tr><td style="background:${C.card};border-radius:24px;border:1px solid ${C.line};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="height:6px;line-height:6px;font-size:0;border-radius:24px 24px 0 0;background:${C.plum};background-image:linear-gradient(100deg,#F5E1B6,#E199BE 30%,#A552C0 65%,#5A2188);">&nbsp;</td></tr>
          <tr><td style="padding:36px 36px 8px;font-family:${FONT};">
            <div style="font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${C.plum};">${esc(eyebrow)}</div>
            <h1 style="margin:12px 0 0;font-size:28px;line-height:34px;font-weight:400;letter-spacing:-0.5px;color:${C.ink};">${esc(title)}</h1>
            <p style="margin:14px 0 0;font-size:16px;line-height:25px;color:${C.muted};">${intro}</p>
          </td></tr>
          ${body}
        </table>
      </td></tr>
      <tr><td style="padding:24px 8px 0;font-family:${FONT};font-size:13px;line-height:20px;color:${C.faint};" align="center">
        A Healing Vaastu &middot; ${esc(business.location)}<br />
        <a href="${business.phoneHref}" style="color:${C.faint};text-decoration:none;">${esc(business.phone)}</a> &middot;
        <a href="mailto:${business.email}" style="color:${C.faint};text-decoration:none;">${esc(business.email)}</a> &middot;
        <a href="${SITE}" style="color:${C.faint};text-decoration:none;">ahealingvaastu.com</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Label/value rows separated by hairlines. */
function detailRows(rows: [string, string][]) {
  return rows
    .map(
      ([k, v], i) => `<tr>
        <td style="padding:14px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:112px;padding-right:12px;vertical-align:top;font-family:${FONT};font-size:12px;line-height:20px;letter-spacing:1px;text-transform:uppercase;color:${C.faint};">${esc(k)}</td>
        <td style="padding:14px 0;${i ? `border-top:1px solid ${C.line};` : ""}vertical-align:top;font-family:${FONT};font-size:15px;line-height:22px;color:${C.ink};">${v}</td>
      </tr>`
    )
    .join("");
}

function section(inner: string, top = 24) {
  return `<tr><td style="padding:${top}px 36px 0;">${inner}</td></tr>`;
}

const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:${C.ink};">
    <a href="${href}" style="display:inline-block;padding:13px 22px;font-family:${FONT};font-size:15px;font-weight:700;color:#FFFCF6;text-decoration:none;border-radius:999px;white-space:nowrap;">${esc(label)}</a>
  </td></tr></table>`;

const messageBlock = (message: string) =>
  `<div style="background:${C.tint};border-left:3px solid ${C.plum};border-radius:12px;padding:16px 18px;font-family:${FONT};font-size:15px;line-height:24px;color:${C.ink};">${message ? para(message) : `<span style="color:${C.faint};">No message added</span>`}</div>`;

const label = (t: string) =>
  `<div style="margin-bottom:10px;font-family:${FONT};font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${C.plum};">${esc(t)}</div>`;

/** Notification sent to the business for each enquiry. */
export function notificationEmail(e: Enquiry) {
  const name = `${e.firstName} ${e.lastName}`;
  const reply = `mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent(`Your ${e.service} enquiry`)}`;
  const body =
    section(
      `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:${C.tint};padding:8px 14px;font-family:${FONT};font-size:13px;line-height:16px;font-weight:700;color:${C.plum};">${esc(e.service)}</td></tr></table>`,
      18
    ) +
    section(
      label("Client") +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows([
          ["Name", esc(name)],
          ["Email", `<a href="mailto:${esc(e.email)}" style="color:${C.ink};">${esc(e.email)}</a>`],
          ["Phone", e.phone ? `<a href="tel:${esc(e.phone.replace(/[^\d+]/g, ""))}" style="color:${C.ink};">${esc(e.phone)}</a>` : `<span style="color:${C.faint};">Not provided</span>`],
          ["Service", esc(e.service)],
          ["Property type", e.propertyType ? esc(e.propertyType) : `<span style="color:${C.faint};">Not provided</span>`],
        ])}</table>`,
      28
    ) +
    section(label("Message") + messageBlock(e.message), 20) +
    section(button(reply, `Reply to ${e.firstName}`), 28) +
    `<tr><td style="padding:16px 36px 36px;font-family:${FONT};font-size:13px;line-height:20px;color:${C.faint};">Replying to this email also goes straight to ${esc(e.email)}.</td></tr>`;

  const html = layout({
    preheader: `${name} is interested in ${e.service}.`,
    eyebrow: "New consultation request",
    title: name,
    intro: `A new enquiry came in through the website. ${esc(e.firstName)} has been told to expect a reply within 24 hours.`,
    body,
  });

  const text = [
    `New consultation request: ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || "Not provided"}`,
    `Service: ${e.service}`,
    `Property type: ${e.propertyType || "Not provided"}`,
    "",
    "Message:",
    e.message || "No message added",
  ].join("\n");

  return { subject: `${e.service} | New Consultation Request`, html, text };
}

/** Acknowledgement sent to the client. */
export function acknowledgementEmail(e: Enquiry) {
  const body =
    section(
      `<p style="margin:0;font-family:${FONT};font-size:16px;line-height:25px;color:${C.muted};">I'll personally review your details and contact you <strong style="color:${C.ink};">within 24 hours</strong> to arrange your <strong style="color:${C.ink};">free 15-minute discovery call</strong>, where we can talk through your space and what you'd like to change.</p>`,
      16
    ) +
    section(
      label("Your request") +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows([
          ["Service", esc(e.service)],
          ["Property type", e.propertyType ? esc(e.propertyType) : `<span style="color:${C.faint};">Not provided</span>`],
        ])}</table>`,
      28
    ) +
    section(label("Your message") + messageBlock(e.message), 20) +
    section(
      `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:24px;color:${C.muted};">Want to talk sooner? Call or message me on WhatsApp.</p>` +
        `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td>${button(business.phoneHref, `Call ${business.phone}`)}</td>
          <td style="padding-left:10px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;border:1px solid ${C.line};background:${C.card};">
            <a href="${business.whatsapp}" style="display:inline-block;padding:12px 20px;white-space:nowrap;font-family:${FONT};font-size:15px;font-weight:700;color:${C.ink};text-decoration:none;border-radius:999px;">WhatsApp</a>
          </td></tr></table></td>
        </tr></table>`,
      28
    ) +
    `<tr><td style="padding:32px 36px 36px;font-family:${FONT};">
      <div style="border-top:1px solid ${C.line};padding-top:24px;font-size:15px;line-height:24px;color:${C.muted};">Warm regards,</div>
      <div style="margin-top:6px;font-size:17px;line-height:24px;font-weight:700;color:${C.ink};">${esc(business.consultant)}</div>
      <div style="font-size:14px;line-height:22px;color:${C.faint};">Vastu &amp; Astrology Consultant</div>
    </td></tr>`;

  const html = layout({
    preheader: `Thank you, ${e.firstName}. I'll be in touch within 24 hours.`,
    eyebrow: "Request received",
    title: `Thank you, ${e.firstName}`,
    intro: `Your request for <strong style="color:${C.ink};">${esc(e.service)}</strong> has reached me safely.`,
    body,
  });

  const text = [
    `Thank you, ${e.firstName}`,
    "",
    `Your request for ${e.service} has reached me safely. I'll personally review your details and contact you within 24 hours to arrange your free 15-minute discovery call.`,
    "",
    `Service: ${e.service}`,
    `Property type: ${e.propertyType || "Not provided"}`,
    "",
    "Your message:",
    e.message || "No message added",
    "",
    `Want to talk sooner? Call ${business.phone} or WhatsApp ${business.whatsapp}.`,
    "",
    "Warm regards,",
    business.consultant,
    "Vastu & Astrology Consultant",
  ].join("\n");

  return { subject: "We've received your request", html, text };
}
