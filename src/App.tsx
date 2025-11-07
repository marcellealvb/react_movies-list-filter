import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

function getPreparedMovies(movies: Movie[], search: string): Movie[] {
  let preparedGoods = movies;
  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch) {
    preparedGoods = preparedGoods.filter(good => {
      const normalizedTitle = good.title.trim().toLowerCase();
      const normalizedDescription = good.description.trim().toLowerCase();

      return (
        normalizedTitle.includes(normalizedSearch) ||
        normalizedDescription.includes(normalizedSearch)
      );
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [search, setSearch] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const visibleMovies = getPreparedMovies(moviesFromServer, search);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={search}
                onChange={handleTitleChange}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
