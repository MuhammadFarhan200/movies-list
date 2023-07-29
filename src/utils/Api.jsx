import axios from 'axios';

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_API_URL;
const genreUrl = import.meta.env.VITE_GENRE_URL;

export const getMovieList = async (page, type) => {
  const movie = await axios.get(`${baseUrl}/movie/${type ?? 'top_rated'}?page=${page ? page : 1}&api_key=${apiKey}`); // API URL
  return movie.data;
}

export const getGenreMovie = async () => {
  const genre = await axios.get(`${genreUrl}/movie/list?api_key=${apiKey}`); // API URL
  return genre.data.genres;
}

export const searchMovie = async (q, page) => {
  const search = await axios.get(`${baseUrl}/search/movie?page=${page}&api_key=${apiKey}&query=${q}`); // API URL
  return search.data;
}

export const getMovieDetail = async (id) => {
  const detail = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`); // API URL
  return detail.data;
}

export const getDiscoverMovie = async (page, genreId, sortBy) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const discover = await axios.get(`${baseUrl}/discover/movie?page=${page}&api_key=${apiKey}&release_date.lte=${year}-${month}-${day}&sort_by=${sortBy ? sortBy : 'popularity.desc'}&with_genres=${genreId}`); // API URL
  return discover.data;
}

export const getMovieCredits = async (id) => {
  const credits = await axios.get(`${baseUrl}/movie/${id}/credits?api_key=${apiKey}`); // API URL
  return credits.data;
}