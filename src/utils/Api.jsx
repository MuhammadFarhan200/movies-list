import axios from 'axios';

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_API_URL;
const genreUrl = import.meta.env.VITE_GENRE_URL;

export const getMovieList = async (page) => {
  const movie = await axios.get(`${baseUrl}/movie/top_rated?page=${page}&api_key=${apiKey}`); // API URL
  return movie.data;
}

export const getGenreMovie = async () => {
  const genre = await axios.get(`${genreUrl}/movie/list?page=1&api_key=${apiKey}`); // API URL
  return genre.data.genres;
}

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${q}`); // API URL
  return search.data;
}

export const getMovieDetail = async (id) => {
  const detail = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`); // API URL
  return detail.data;
}