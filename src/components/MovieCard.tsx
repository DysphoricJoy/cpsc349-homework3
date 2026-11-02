import { useState } from "react";
import type { Movie } from "../lib/movies";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="movie-card">
      {movie.poster_path && !imageFailed ? (
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          width="200"
          height="300"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="poster poster-placeholder" role="img" aria-label={`No poster for ${movie.title}`}>
          No poster available
        </div>
      )}
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date || "N/A"}</p>
      <p>Rating: {movie.vote_average ?? "N/A"}</p>
    </article>
  );
}
