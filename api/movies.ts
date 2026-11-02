import type { IncomingMessage, ServerResponse } from "node:http";

// Runs on the server so the API key stays out of the browser bundle.
export default async function moviesHandler(request: IncomingMessage, response: ServerResponse) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  function send(status: number, data: unknown) {
    response.statusCode = status;
    response.end(JSON.stringify(data));
  }

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    send(405, { error: "Only GET requests are supported." });
    return;
  }

  const params = new URL(request.url || "/", "http://localhost").searchParams;
  const query = (params.get("query") || "").trim();
  const page = Number(params.get("page") || 1);
  if (!Number.isInteger(page) || page < 1 || page > 500) {
    send(400, { error: "Invalid page number." });
    return;
  }

  const key = process.env.TMDB_API_KEY;
  if (!key) {
    send(503, { error: "Movie service is not configured." });
    return;
  }

  const endpoint = query ? "search/movie" : "movie/popular";
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", String(page));
  if (query) {
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
  }

  try {
    const result = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!result.ok) {
      send(502, { error: "Movie service is unavailable." });
      return;
    }
    const data = await result.json();
    response.setHeader("Cache-Control", "public, max-age=60");
    send(200, data);
  } catch {
    send(502, { error: "Could not reach the movie service." });
  }
}
