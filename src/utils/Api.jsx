import axios from 'axios';

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_API_URL;
const genreUrl = import.meta.env.VITE_GENRE_URL;

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}`); // API URL
  return movie.data.results;
}

export const getGenreMovie = async () => {
  const genre = await axios.get(`${genreUrl}/movie/list?page=1&api_key=${apiKey}`); // API URL
  return genre.data.genres;
}

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${q}`); // API URL
  return search.data;
}