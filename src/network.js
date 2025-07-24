export {
  fetchSearchMovies,
  fetchHotMovies,
  fetchPopularMovies,
  IMAGE_BASE,
  QUERY_SUFFIX,
};
// API data
const API_KEY = "ae9417b72a04e975455b2ed2ac2a7001";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const QUERY_SUFFIX = "&include_adult=false&language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjYwMGEyYTkxMDhmMTAzN2MzYmRmYjg2NWRjN2FlOSIsIm5iZiI6MTc1MjEzMjA4NC4yNzksInN1YiI6IjY4NmY2OWY0M2MzMDg0YWMzY2U4MDlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jomYGTIz91zlRE7ptaJxuK4MI_ooTJU1c12rMVhCk-s",
  },
};

// function searchMovies
async function fetchSearchMovies(movieName) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${movieName.replaceAll(
        " ",
        "%20"
      )}&language=en-US`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

// poplulating hot movies
async function fetchHotMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?&language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

//fetchPopularMovies---

async function fetchPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}
