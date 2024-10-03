import './App.css';
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails"; 

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state

  const API_KEY = "cb9c389a"; // Your actual API key

  const fetchMovies = async (query) => {
    setLoading(true); 
    setError(null); 
    setSelectedMovie(null); 
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError("No movies found. Please try another search.");
        setMovies([]);
      }
    } catch (err) {
      setError("Error fetching data. Please check your internet connection.");
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setError("Movie details not found.");
      }
    } catch (err) {
      setError("Error fetching movie details. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1><b>WELCOME TO MOVIE-MANIA!</b></h1>
      <SearchBar onSearch={fetchMovies} />
      
      {loading && <p>Loading...</p>} {/* Loading indicator */}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
      
      {!selectedMovie && !loading && <MovieList movies={movies} onMovieClick={fetchMovieDetails} />} {/* Pass onMovieClick */}

      {selectedMovie && !loading && <MovieDetails movie={selectedMovie} />}
    </div>
  );
}

export default App;
