const API_KEY = "ae9417b72a04e975455b2ed2ac2a7001";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 rounded-lg overflow-hidden shadow-lg";

    card.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${
      movie.title
    }" class="w-full h-80 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
        <p class="text-sm text-gray-400">${movie.overview.slice(0, 100)}...</p>
      </div>
    `;

    moviesContainer.appendChild(card);
  });
}

// Run on page load--------------------------
fetchPopularMovies();

//Movie card-------------------------------------------------------

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";

    card.innerHTML = `
      <a href="https://www.themoviedb.org/movie/${
        movie.id
      }" target="_blank" class="block hover:opacity-80 transition">
        <img src="${IMAGE_BASE + movie.poster_path}" alt="${
      movie.title
    }" class="w-full h-80 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
          <p class="text-sm text-gray-400">${movie.overview.slice(
            0,
            100
          )}...</p>
          <p class="text-sm text-gray-400 mt-2">Release Date: ${
            movie.release_date
          }</p>
          <p class="text-sm text-yellow-400">Rating: ${movie.vote_average}</p>
        </div>
      </a>
    `;

    moviesContainer.appendChild(card);
  });
}
