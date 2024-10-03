import React from "react";

function MovieList({ movies, onMovieClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <a 
          key={movie.imdbID} 
          href={`https://www.imdb.com/title/${movie.imdbID}`}  // IMDb link
          target="_blank"  // Opens in a new tab
          rel="noopener noreferrer"  // Security measure for opening in a new tab
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img src={movie.Poster} alt={movie.Title} className="movie-thumbnail" />
          <div className="p-4">
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p className="text-gray-600">Release Year: {movie.Year}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default MovieList;
