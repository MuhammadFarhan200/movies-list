import axios from 'axios';

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_APIURL;
const genreUrl = process.env.REACT_APP_GENREURL;

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}`); // API URL
  return movie.data.results;
}

export const getGenreMovie = async () => {
  const genre = await axios.get(`${genreUrl}/movie/list?page=1&api_key=${apiKey}`); // API URL
  return genre.data.results;
}

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${q}`); // API URL
  return search.data;
}