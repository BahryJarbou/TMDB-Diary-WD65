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

function createCard(movie) {
  const card = document.createElement("div");
  card.classList.add(
    "bg-gray-800",
    "rounded-lg",
    "overflow-hidden",
    "justify-content-between",
    "shadow-lg"
  );
  const moviePage = document.createElement("a");
  moviePage.href = `https://www.themoviedb.org/movie/${movie.id}`;
  moviePage.target = "_blank";
  moviePage.classList.add("block", "hover:opacity-80", "transition");
  const img = document.createElement("img");
  img.src = IMAGE_BASE + movie.poster_path;
  img.alt = `${movie.title}`;
  img.classList.add("w-full", "h-80", "object-cover");
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("p-4");
  const title = document.createElement("h3");
  title.innerText = movie.title;
  title.classList.add("text-lg", "font-bold", "mb-2");
  const overview = document.createElement("p");
  overview.innterText = movie.overview;
  overview.classList.add("text-sm", "text-gray-400");
  const releaseDate = document.createElement("p");
  releaseDate.innerText = movie.release_date;
  releaseDate.classList.add("text-sm", "text-gray-400", "mt-2");
  const rating = document.createElement("p");
  rating.innerText = `Rating: ${movie.vote_average}`;
  rating.classList.add("text-sm", "text-yellow-400");
  const addToFavsBtn = document.createElement("button");
  addToFavsBtn.innerHTML = "&#9734";
  addToFavsBtn.className =
    "bg-transparent hover:bg-blue-400 font-extrabold text-2xl text-black rounded-full bolded justify-self-start";
  addToFavsBtn.addEventListener("click", () => {
    addMovieToFavs(movie);
    alert("Movie added to favorites!");
  });
  moviePage.appendChild(img);
  infoContainer.appendChild(title);
  infoContainer.appendChild(overview);
  infoContainer.appendChild(releaseDate);
  infoContainer.appendChild(rating);
  moviePage.appendChild(infoContainer);
  moviePage.appendChild(addToFavsBtn);
  card.appendChild(moviePage);
  return card;
}

const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const searchButton = document.querySelector("#searchButton");
const closeButton = document.querySelector("#closeButton");
const searchInput = document.querySelector("#searchInput");

// "Show the dialog" button opens the dialog modally
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  dialog.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-2",
    "gap-4"
  );
  const searchResults = await fetchSearchMovies(searchInput.value);
  searchResults.forEach((searchResult) => {
    const card = createCard(searchResult);
    dialog.prepend(card);
  });
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.classList.remove(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-2",
    "gap-4"
  );
  dialog.close();
});

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

const hotMoviesContainer = document.getElementById("hotMovies");
window.addEventListener("load", async () => {
  const hotMovies = await fetchHotMovies();
  hotMovies.slice(0, 10).forEach((hotMovie) => {
    const card = createCard(hotMovie);
    hotMoviesContainer.appendChild(card);
  });
});

// localStorage favorites
function addMovieToFavs(movie) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  if (favs.includes(movie)) {
    return;
  }
  localStorage.setItem("favs", JSON.stringify([...favs, movie]));
}
