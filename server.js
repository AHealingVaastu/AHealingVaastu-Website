/**
 * Production startup file for cPanel's "Setup Node.js App" (Phusion Passenger).
 * Passenger does not run `next start` itself — it expects a plain Node process
 * that listens on the PORT it assigns. This wraps Next.js's request handler
 * in a minimal http server for that purpose.
 *
 * Not used by Vercel or `npm run dev` — those use Next's own server directly.
 * Build first (`npm run build`), then start this with `node server.js`.
 */
const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> A Healing Vaastu server ready on port ${port}`);
  });
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
