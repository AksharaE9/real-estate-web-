/**
 * ONYX Estates - Standalone Mini Backend Server
 * Run: node server.js
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DB_PATH = path.resolve(__dirname, "./data/enquiries.json");

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = req.url.split("?")[0];

  if (url === "/api/enquiries") {
    if (req.method === "GET") {
      try {
        const fileData = fs.existsSync(DB_PATH) ? fs.readFileSync(DB_PATH, "utf-8") : "[]";
        const enquiries = JSON.parse(fileData);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, count: enquiries.length, enquiries }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const data = JSON.parse(body || "{}");
          const newEnquiry = {
            id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
            createdAt: new Date().toISOString(),
            status: "new",
            ...data,
          };

          const currentList = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8") || "[]")
            : [];
          currentList.unshift(newEnquiry);

          fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
          fs.writeFileSync(DB_PATH, JSON.stringify(currentList, null, 2));

          res.setHeader("Content-Type", "application/json");
          res.statusCode = 201;
          res.end(
            JSON.stringify({
              success: true,
              message: "Enquiry successfully logged into ONYX database.",
              id: newEnquiry.id,
            })
          );
        } catch (err) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

server.listen(PORT, () => {
  console.log(`ONYX Mini Backend running on http://localhost:${PORT}`);
});
