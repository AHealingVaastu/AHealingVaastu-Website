// Email templates for the contact form. The client acknowledgement is written as a
// short personal letter from Anjli; the notification is a plain working memo.
// Email clients ignore web fonts and most CSS, so these use simple tables,
// inline styles and a Helvetica stack.
import { business } from "@/lib/content";

const SITE = "https://ahealingvaastu.com";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const INK = "#2A0E3D";
const TEXT = "#3B2A33";
const MUTED = "#8A7A80";
const RULE = "#E9E2E6";
const LINK = "#7B3F8C";

export type Enquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** form value, e.g. "astrology" */
  serviceValue: string;
  /** display name, e.g. "Astrological Guidance" */
  service: string;
  propertyType: string;
  message: string;
};

export function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

const para = (s: string) => esc(s).replace(/\n/g, "<br />");
const p = (html: string, extra = "") =>
  `<p style="margin:0 0 18px;font-family:${FONT};font-size:16px;line-height:26px;color:${TEXT};${extra}">${html}</p>`;
const a = (href: string, label: string) => `<a href="${href}" style="color:${LINK};text-decoration:underline;">${label}</a>`;

/** How the letter refers to each service in a sentence. */
const servicePhrase: Record<string, string> = {
  residential: "Vastu for your home",
  business: "Vastu for your business",
  "pre-purchase": "a Vastu review before you buy",
  astrology: "astrological guidance",
  "horoscope-report": "a horoscope report",
  online: "an online consultation",
};

/** What Anjli needs before the discovery call, by service. */
function whatToSend(serviceValue: string) {
  const birth = "your date, time and place of birth";
  const space = "a floor plan or a few photos of the space, and which direction the main entrance faces";
  switch (serviceValue) {
    case "astrology":
    case "horoscope-report":
      return birth;
    case "online":
      return `${space}, and ${birth} if you'd also like an astrology reading`;
    default:
      return space;
  }
}

function shell(preheader: string, inner: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
</head>
<body style="margin:0;padding:0;background:#FFFFFF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
  <tr><td align="center" style="padding:36px 20px 40px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding-bottom:28px;border-bottom:1px solid ${RULE};">
        <a href="${SITE}" style="text-decoration:none;"><img src="${SITE}/logo.png" width="40" height="40" alt="A Healing Vaastu" style="display:block;border:0;border-radius:10px;" /></a>
      </td></tr>
      <tr><td style="padding-top:30px;">${inner}</td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Acknowledgement sent to the client, as a letter from Anjli. */
export function acknowledgementEmail(e: Enquiry) {
  const service = e.service;
  const about = servicePhrase[e.serviceValue] || service;
  const ask = whatToSend(e.serviceValue);
  const whatsapp = business.whatsapp;

  const records = [
    `${esc(service)}${e.propertyType ? ` &middot; ${esc(e.propertyType)}` : ""}`,
    e.message ? `<span style="font-style:italic;">&ldquo;${para(e.message)}&rdquo;</span>` : "",
  ]
    .filter(Boolean)
    .join("<br />");

  const inner =
    p(`Dear ${esc(e.firstName)},`) +
    p(`Thank you for getting in touch about ${esc(about)}. I've read your note, and I'll be in touch within a day to arrange a free 15-minute discovery call at a time that suits you.`) +
    p(`To make the most of that call, it helps to have ${esc(ask)}. You can simply reply to this email with them whenever it's convenient.`) +
    p(`If anything is urgent in the meantime, call me on ${a(business.phoneHref, esc(business.phone))} or send a message on ${a(whatsapp, "WhatsApp")}.`) +
    `<p style="margin:28px 0 0;font-family:${FONT};font-size:16px;line-height:26px;color:${TEXT};">Warmly,</p>
     <p style="margin:6px 0 0;font-family:${FONT};font-size:16px;line-height:24px;color:${INK};font-weight:700;">${esc(business.consultant)}</p>
     <p style="margin:0;font-family:${FONT};font-size:14px;line-height:22px;color:${MUTED};">Vedic Vastu &amp; Astrology Expert, A Healing Vaastu</p>
     <p style="margin:40px 0 0;padding-top:20px;border-top:1px solid ${RULE};font-family:${FONT};font-size:13px;line-height:21px;color:${MUTED};">For your records, you wrote to us about:<br />${records}</p>
     <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:21px;color:${MUTED};">A Healing Vaastu &middot; ${esc(business.location)} &middot; ${a(SITE, "ahealingvaastu.com")}</p>`;

  const text = [
    `Dear ${e.firstName},`,
    "",
    `Thank you for getting in touch about ${about}. I've read your note, and I'll be in touch within a day to arrange a free 15-minute discovery call at a time that suits you.`,
    "",
    `To make the most of that call, it helps to have ${ask}. You can simply reply to this email with them whenever it's convenient.`,
    "",
    `If anything is urgent in the meantime, call me on ${business.phone} or send a message on WhatsApp: ${whatsapp}`,
    "",
    "Warmly,",
    business.consultant,
    "Vedic Vastu & Astrology Expert, A Healing Vaastu",
    "",
    "---",
    `For your records, you wrote to us about: ${service}${e.propertyType ? `, ${e.propertyType}` : ""}`,
    e.message ? `"${e.message}"` : "",
  ].join("\n");

  return {
    subject: "We've received your request",
    html: shell(`Thank you, ${e.firstName}. I'll be in touch within a day.`, inner),
    text,
  };
}

/** Notification sent to the business: a plain memo with everything needed to reply. */
export function notificationEmail(e: Enquiry, receivedAt = new Date()) {
  const name = `${e.firstName} ${e.lastName}`;
  const when = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(receivedAt);
  const tel = e.phone.replace(/[^\d+]/g, "");

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:5px 16px 5px 0;width:96px;vertical-align:top;font-family:${FONT};font-size:14px;line-height:22px;color:${MUTED};">${label}</td>
      <td style="padding:5px 0;vertical-align:top;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};">${value}</td>
    </tr>`;

  const inner =
    `<p style="margin:0;font-family:${FONT};font-size:22px;line-height:28px;color:${INK};font-weight:700;">${esc(name)}</p>
     <p style="margin:4px 0 22px;font-family:${FONT};font-size:15px;line-height:22px;color:${TEXT};">wants help with ${esc(e.service)}</p>
     <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
       ${row("Email", a(`mailto:${esc(e.email)}`, esc(e.email)))}
       ${row("Phone", e.phone ? a(`tel:${esc(tel)}`, esc(e.phone)) : `<span style="color:${MUTED};">Not given</span>`)}
       ${row("Property", e.propertyType ? esc(e.propertyType) : `<span style="color:${MUTED};">Not given</span>`)}
     </table>` +
    (e.message
      ? `<p style="margin:0 0 6px;font-family:${FONT};font-size:14px;line-height:22px;color:${MUTED};">Message</p>` +
        p(para(e.message), `color:${INK};`)
      : p(`No message was added.`, `color:${MUTED};`)) +
    `<p style="margin:28px 0 0;padding-top:18px;border-top:1px solid ${RULE};font-family:${FONT};font-size:13px;line-height:21px;color:${MUTED};">
       Reply to this email to answer ${esc(e.firstName)} directly. ${esc(e.firstName)} has been sent an acknowledgement from Anjli.<br />
       Received ${esc(when)} (Toronto) via ahealingvaastu.com
     </p>`;

  const text = [
    name,
    `wants help with ${e.service}`,
    "",
    `Email: ${e.email}`,
    `Phone: ${e.phone || "Not given"}`,
    `Property: ${e.propertyType || "Not given"}`,
    "",
    e.message ? `Message:\n${e.message}` : "No message was added.",
    "",
    `Reply to this email to answer ${e.firstName} directly.`,
    `Received ${when} (Toronto) via ahealingvaastu.com`,
  ].join("\n");

  return {
    subject: `${e.service} | New Consultation Request`,
    html: shell(`${name}: ${e.service}`, inner),
    text,
  };
}
