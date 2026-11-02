# Movie Explorer - CPSC 349 Homework 3

A React and TypeScript movie browser with plain CSS, built with Vite.

## Features

- Popular movies from TMDB, with 20 results per page when available.
- Movie posters, titles, release dates, and average ratings.
- Title search, Previous/Next buttons, and a current-page indicator.
- Release-date and rating sorting in both directions, applied to the current page.
- Reusable components, state, props, effects, and responsive styling.

## Run locally

Install Node.js 22.12 or newer. Open the folder containing `package.json` in VS Code.

In a PowerShell terminal:

```powershell
npm install
Copy-Item .env.example .env.local
```

Open `.env.local` and replace `your_tmdb_api_key_here` with your TMDB v3 API key. Use the short API key, not the long API Read Access Token. Save, then run:

```powershell
npm run dev
```

Open the local URL printed in the terminal. On macOS/Linux, use `cp .env.example .env.local` for the copy step. Restart the development server after changing the key.

The Vite development server also runs the movie API locally, so no second terminal is needed.

## Build and preview

```powershell
npm run build
npm run preview
```

The build includes TypeScript checking. The local preview also uses `.env.local` for movie requests.

## Upload to GitHub

Repository: https://github.com/DysphoricJoy/cpsc349-homework3

1. Extract the source ZIP and open the `homework3` folder inside it.
2. In the repository, choose **Add file > Upload files**.
3. Drag the contents of `homework3` into the upload area, including the `src`, `api`, and `public` folders.
4. Check that `package.json`, `package-lock.json`, `index.html`, and `vercel.json` will be at the repository root.
5. Wait for every file to upload, then commit directly to `main`.

Upload the extracted source files, not the ZIP. Do not upload `.env.local`, `node_modules`, or `dist` if you tested locally first.

## Deploy on Vercel

1. Sign in at https://vercel.com using GitHub.
2. Choose **Add New > Project**, then import `DysphoricJoy/cpsc349-homework3`. If it is not listed, configure the GitHub connection to include this repository.
3. Leave the root directory at the repository root. Select **Vite** if it is not detected automatically.
4. Use build command `npm run build` and output directory `dist`. The included `vercel.json` sets these values.
5. Before deploying, add an environment variable named **TMDB_API_KEY**, using your TMDB v3 API key as the value. Enable it for Production and Preview.
6. Click **Deploy** and wait for the deployment to finish.
7. Open the production domain ending in `.vercel.app`. Confirm that movie cards load.
8. Open that production URL in an incognito window. It must be accessible without signing in for the professor to view it. If it requires a login, check the project's Deployment Protection settings.

The `api/movies.ts` endpoint runs as a server function on Vercel. The API key belongs in the server environment variable `TMDB_API_KEY`; do not add a `VITE_` prefix. Adding or changing the environment variable after deployment requires a redeploy.

## Check the result

1. Confirm that movie cards show posters, titles, release dates, and ratings.
2. Click Next and Previous and check the page indicator.
3. Search for Panda and check that the search starts on page 1.
4. Try all four sorting choices. Each one sorts the current page.
5. Clear the search to return to popular movies.

## Submission

Submit `homework3.pdf` containing your public GitHub repository URL and your actual Vercel production URL. Create the PDF after the deployment succeeds. Test both links before submitting.

## Source layout

| File | Purpose |
| --- | --- |
| `src/App.tsx` | State, fetching, search, and page rendering |
| `src/components/` | Movie cards, search controls, and pagination |
| `src/lib/movies.ts` | Movie types and sorting |
| `src/styles.css` | Page styles and responsive layout |
| `api/movies.ts` | Server-side requests to TMDB |
| `vite.config.ts` | React build setup and local API handling |
| `vercel.json` | Deployment settings |

## Credits

Movie data, posters, and the logo are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
