import React from "react";

function MovieDetails({ movie }) {
  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <button onClick={() => window.location.reload()}>Go Back</button> {/* Reload to go back */}
    </div>
  );
}

export default MovieDetails;
