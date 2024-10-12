import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to convert IMDb rating to stars
const renderStars = (rating) => {
  const totalStars = 5; // Display 5 stars max
  const filledStars = Math.round((rating / 10) * totalStars); // Convert 10-point rating to 5-point
  const emptyStars = totalStars - filledStars;

  return (
    <>
      {"★".repeat(filledStars)}{"☆".repeat(emptyStars)}
    </>
  );
};

function MovieList({ movies, onMovieClick }) {
  const [movieRatings, setMovieRatings] = useState({});

  // Fetch movie details to get imdbRating
  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=cb9c389a&i=${imdbID}`);
      if (response.data.Response === "True") {
        setMovieRatings((prev) => ({
          ...prev,
          [imdbID]: response.data.imdbRating, // Store rating
        }));
      }
    } catch (err) {
      console.error("Error fetching movie rating", err);
    }
  };

  useEffect(() => {
    // Fetch the ratings for each movie in the list
    movies.forEach((movie) => {
      fetchMovieDetails(movie.imdbID);
    });
  }, [movies]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div 
          key={movie.imdbID} 
          onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")} //open on the imbd website//
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-800 cursor-pointer" // Added cursor-pointer for clickability
        >
          <img 
           src={movie.Poster !== "N/A" ? movie.Poster : "kdrama.jpg"} 
            alt={movie.Title} 
             className="w-full h-64 object-cover" 
             onError={(e) => { e.target.src = "kdrama.jpg"; }} 
/>


          <div className="p-4">
            <h2 className="movie-title text-yellow-300 text-center">{movie.Title}</h2> {/* Centered */}
            <p className="movie-year text-white text-center">Release Year: {movie.Year}</p> {/* Centered */}
            {/* Display stars if rating exists */}
            {movieRatings[movie.imdbID] && (
              <p className="movie-rating text-yellow-500 text-center">
                Rating: {renderStars(movieRatings[movie.imdbID])}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
