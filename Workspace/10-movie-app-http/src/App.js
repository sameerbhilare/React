import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback to avoid recreation of fetchMoviesHandler function
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true); // loading data
    setError(null); // error state

    try {
      // Using JS built-in Fetch APIs to make HTTP requests.
      // Test Start Wars API - https://swapi.dev/api/films
      const response = await fetch(
        'https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);

      let loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      setMovies(loadedMovies);

      /* // for star wars API
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      */
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // loading data finished
  }, []); // no need to add state updating functions (setIsLoading,setMovies,etc.) bcz React guarantees that they dont change

  // fetch movies as soon as component is loaded and when fetchMoviesHandler function changes
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  /*
    Sending POST request to store movie to our firebase backend
  */
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie), // need to convert JS object to JSON
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <p>No movies found!</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
