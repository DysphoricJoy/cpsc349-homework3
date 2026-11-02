import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import moviesHandler from "./api/movies.ts";

// Use the same API handler locally that Vercel runs in production.
function movieApi(): Plugin {
  const attach = (server: { middlewares: import("vite").Connect.Server }) => {
    server.middlewares.use((request, response, next) => {
      const pathname = new URL(request.url || "/", "http://localhost").pathname;
      if (pathname !== "/api/movies") {
        next();
        return;
      }
      void moviesHandler(request, response);
    });
  };
  return { name: "movie-api", configureServer: attach, configurePreviewServer: attach };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "TMDB_");
  if (!process.env.TMDB_API_KEY && env.TMDB_API_KEY) {
    process.env.TMDB_API_KEY = env.TMDB_API_KEY;
  }
  return { plugins: [react(), movieApi()] };
});
