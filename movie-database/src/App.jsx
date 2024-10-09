import logo from './big.png';
import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer"; 
import videoSrc from './app.mp4';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [kDramaMovies, setKDramaMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchActive, setSearchActive] = useState(false); 
  const [showBackToTop, setShowBackToTop] = useState(false);

  const API_KEY = "cb9c389a";

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      if (response.data.Response === "True") {
        const movieDetailsPromises = response.data.Search.map(async (movie) => {
          const detailsResponse = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
          return detailsResponse.data;
        });
        const movieDetails = await Promise.all(movieDetailsPromises);
        setMovies(movieDetails);
        setSearchActive(true); 
      } else {
        setError("No movies found. Please try another search.");
        setMovies([]);
        setSearchActive(false); 
      }
    } catch (err) {
      setError("Error fetching data. Please check your internet connection.");
      setMovies([]);
      setSearchActive(false); 
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

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=Avengers&type=movie`);
      if (response.data.Response === "True") {
        const trendingDetailsPromises = response.data.Search.slice(0, 4).map(async (movie) => {
          const detailsResponse = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
          return detailsResponse.data;
        });
        const trendingDetails = await Promise.all(trendingDetailsPromises);
        setTrendingMovies(trendingDetails);
      } else {
        setError("No trending movies found.");
      }
    } catch (err) {
      setError("Error fetching trending movies.");
    }
    setLoading(false);
  };

  const fetchKDramaMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=k-drama&type=series`);
      if (response.data.Response === "True") {
        const kDramaDetailsPromises = response.data.Search.slice(0, 4).map(async (movie) => {
          const detailsResponse = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
          return detailsResponse.data;
        });
        const kDramaDetails = await Promise.all(kDramaDetailsPromises);
        setKDramaMovies(kDramaDetails);
      } else {
        setError("No K-Drama movies found.");
      }
    } catch (err) {
      setError("Error fetching K-Drama movies.");
    }
    setLoading(false);
  };

  const fetchSeries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=series&type=series`);
      if (response.data.Response === "True") {
        const seriesDetailsPromises = response.data.Search.slice(0, 4).map(async (series) => {
          const detailsResponse = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${series.imdbID}`);
          return detailsResponse.data;
        });
        const seriesDetails = await Promise.all(seriesDetailsPromises);
        setSeries(seriesDetails);
      } else {
        setError("No series found.");
      }
    } catch (err) {
      setError("Error fetching series.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchKDramaMovies();
    fetchSeries();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div>
        {/* Wrap the LOGO in a clickable link */}
        <a href="/">
          <img src={logo} alt="MovieMania Logo" className="logo" />
        </a>

        <nav className="navbar">
          <ul className="nav-links">
            <li className="nav-item">Home</li>
            <li className="nav-item">Trending</li>
            <li className="nav-item">K-Drama</li>
            <li className="nav-item">Series</li>
          </ul>
        </nav>

        <div className="hero-section">
          <h1 className="website-name">WELCOME TO MovieMania</h1>
          <p className="website-tagline">Discover Your Next Favorite Movie!</p>
          <SearchBar onSearch={fetchMovies} />
        </div>

        {!searchActive && (
          <>
            <div className="trending-section">
              <h2 className="section-title">Trending Movies</h2>
              {loading && trendingMovies.length === 0 && <p>Loading trending movies...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && trendingMovies.length > 0 && (
                <MovieList movies={trendingMovies} onMovieClick={fetchMovieDetails} />
              )}
            </div>

            <div className="kdrama-section">
              <h2 className="section-title">K-Drama Movies</h2>
              {loading && kDramaMovies.length === 0 && <p>Loading K-Drama movies...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && kDramaMovies.length > 0 && (
                <MovieList movies={kDramaMovies} onMovieClick={fetchMovieDetails} />
              )}
            </div>

            <div className="series-section">
              <h2 className="section-title">Series</h2>
              {loading && series.length === 0 && <p>Loading series...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!loading && series.length > 0 && (
                <MovieList movies={series} onMovieClick={fetchMovieDetails} />
              )}
            </div>
          </>
        )}

        {searchActive && (
          <div className="search-results-section">
            <h2 className="section-title">Search Results</h2>
            {loading && <p>Loading search results...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && movies.length > 0 && (
              <MovieList movies={movies} onMovieClick={fetchMovieDetails} />
            )}
          </div>
        )}

        {selectedMovie && (
          <MovieDetails movie={selectedMovie} />
        )}

        {showBackToTop && (
          <button className="back-to-top" onClick={scrollToTop}>Back to Top</button>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
