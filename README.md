# Movie Explorer - CPSC 349 Homework 3

[Live website](https://cpsc349-homework3-pied.vercel.app/)

A React+TypeScript app that displays 20 movies per page from TMDB, including posters, titles, release dates and ratings. It supports title search, previous/next navigation, and sorting by release date or rating. Styling uses plain CSS.

## Run locally

Requires Node.js 22.12 or newer. Copy `.env.example` to `.env.local` and set `TMDB_API_KEY` to a TMDB API key.

```bash
npm install
npm run dev
```

Build with `npm run build`. Movie requests go through `api/movies.ts`, which keeps the key on the server.

## Credits

Movie data and images are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API (but is not endorsed or certified by TMDB, I think I should denote that).
