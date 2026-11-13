import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function miniBackendPlugin(): Plugin {
  return {
    name: "mini-backend-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];

        if (url === "/api/enquiries") {
          const dbPath = path.resolve(__dirname, "./data/enquiries.json");

          if (req.method === "GET") {
            try {
              const fileData = fs.existsSync(dbPath) ? fs.readFileSync(dbPath, "utf-8") : "[]";
              const enquiries = JSON.parse(fileData);
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, count: enquiries.length, enquiries }));
            } catch (err: any) {
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

                const currentList = fs.existsSync(dbPath)
                  ? JSON.parse(fs.readFileSync(dbPath, "utf-8") || "[]")
                  : [];
                currentList.unshift(newEnquiry);

                fs.mkdirSync(path.dirname(dbPath), { recursive: true });
                fs.writeFileSync(dbPath, JSON.stringify(currentList, null, 2));

                res.setHeader("Content-Type", "application/json");
                res.statusCode = 201;
                res.end(
                  JSON.stringify({
                    success: true,
                    message: "Enquiry successfully received by ONYX backend.",
                    id: newEnquiry.id,
                  })
                );
              } catch (err: any) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), miniBackendPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
