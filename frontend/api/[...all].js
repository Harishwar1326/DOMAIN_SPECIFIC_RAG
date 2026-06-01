import app from "./backend/index.js";

export default async function handler(req, res) {
  // Fix Vercel's request object to be compatible with Express
  await new Promise((resolve) => {
    app(req, res, resolve);
  });
}
