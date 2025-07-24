export { createCard, displayMovies, populateFavs };
import { IMAGE_BASE, fetchRecommendations } from "./network.js";
import { addMovieToFavs, getFavs, getFavsIDs } from "./storage.js";

//ui elements
const recommendations = document.querySelector("#recommendations");

// create movie card
function createCard(movie) {
  const card = document.createElement("div");
  card.classList.add(
    "bg-gray-800",
    "rounded-lg",
    "shadow-lg",
    "min-w-[15vw]",
    "relative",
    "z-10"
  );
  const moviePage = document.createElement("a");
  moviePage.href = `https://www.themoviedb.org/movie/${movie.id}`;
  moviePage.target = "_blank";
  moviePage.classList.add("block", "hover:opacity-80");
  const img = document.createElement("img");
  img.src = IMAGE_BASE + movie.poster_path;
  img.alt = `${movie.title}`;
  img.classList.add("w-full", "rounded-t-lg");
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("p-4");
  const title = document.createElement("h3");
  title.innerText = movie.title;
  title.classList.add(
    "text-lg",
    "font-bold",
    "mb-2",
    "truncate",
    "text-nowrap"
  );
  const overview = document.createElement("p");
  overview.innerText = movie.overview.slice(0, 100) + "...";
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
    "bg-transparent hover:bg-blue-400 font-extrabold text-2xl text-black rounded-full bolded justify-self-start absolute right-5 top-5";
  addToFavsBtn.addEventListener("click", () => {
    const favsIDs = getFavsIDs();
    if (favsIDs.includes(movie.id)) {
      alert("movie alread in favorites");
      return;
    }
    addMovieToFavs(movie);
    alert("Movie added to favorites!");
    populateFavs();
  });
  moviePage.appendChild(img);
  infoContainer.appendChild(title);
  infoContainer.appendChild(overview);
  infoContainer.appendChild(releaseDate);
  infoContainer.appendChild(rating);
  card.appendChild(moviePage);
  card.appendChild(infoContainer);
  card.appendChild(addToFavsBtn);
  return card;
}

//displayMovies-----
function displayMovies(movies, container, onClick) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const card = createCard(movie);
    if (typeof onClick === "function") {
      card.addEventListener("click", () => onClick(movie));
    }
    container.appendChild(card);
  });
}

// populate recommendations
async function populateFavs() {
  console.log("being called");
  const favs = getFavs();
  if (favs.length === 0) {
    recommendations.innerText =
      "Add Some movies to your favorites and we'll recommend something for you!";
    recommendations.className = "text-6xl";
    return;
  }
  recommendations.innerText = "";
  const randFav = favs[Math.floor(Math.random() * favs.length)];
  const recommends = await fetchRecommendations(randFav.id);
  recommends.forEach((movie) => {
    const card = createCard(movie);
    recommendations.appendChild(card);
  });
}

// populate recommendations
async function populateFavs() {
  console.log("being called");
  const favs = getFavs();
  if (favs.length === 0) {
    const noRecommendations = document.createElement("p");
    noRecommendations.innerText =
      "Add Some movies to your favorites and we'll recommend something for you!";
    noRecommendations.className = "text-6xl";
    recommendations.appendChild(noRecommendations);
    return;
  }
  while (recommendations.firstChild) {
    console.log(recommendations.firstChild);
    recommendations.removeChild(recommendations.firstChild);
  }
  const randFav = favs[Math.floor(Math.random() * favs.length)];
  const recommends = await fetchRecommendations(randFav.id);
  recommends.forEach((movie) => {
    const card = createCard(movie);
    recommendations.appendChild(card);
  });
}
