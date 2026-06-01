import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import backendApp from "./api/backend/index.js";

function mountBackendPlugin() {
  return {
    name: "mount-naive-rag-backend",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith("/api/backend")) {
          // Pass to Express
          return backendApp(req, res, next);
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith("/api/backend")) {
          return backendApp(req, res, next);
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mountBackendPlugin()],
});
