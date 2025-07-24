import {
  fetchSearchMovies,
  fetchHotMovies,
  fetchRecommendations,
  IMAGE_BASE,
} from "./network.js";
import { createCard } from "./ui.js";
import { getFavs } from "./storage.js";
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const searchButton = document.querySelector("#searchButton");
const closeButton = document.querySelector("#closeButton");
const searchInput = document.querySelector("#searchInput");
const hotMoviesContainer = document.getElementById("hotMovies");
const scrollLeft = document.querySelector("#scrollLeft");
const scrollRight = document.querySelector("#scrollRight");
const scrollLeft2 = document.querySelector("#scrollLeft2");
const scrollRight2 = document.querySelector("#scrollRight2");
const recommendations = document.querySelector("#recommendations");
const posterTitle = document.querySelector("#posterTitle");
const posterImage = document.querySelector("#posterImage");
const posterDescription = document.querySelector("#posterDescription");

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

// scroll buttons for the hot movies section
scrollLeft.addEventListener("click", () => {
  hotMoviesContainer.scrollLeft -= 800;
});

scrollRight.addEventListener("click", () => {
  hotMoviesContainer.scrollLeft += 800;
});

scrollLeft2.addEventListener("click", () => {
  recommendations.scrollLeft -= 800;
});

scrollRight2.addEventListener("click", () => {
  recommendations.scrollLeft += 800;
});

// retrieving and rendering hot movies on page load
window.addEventListener("load", async () => {
  const hotMovies = await fetchHotMovies();
  posterTitle.innerHTML = hotMovies[0].title;
  posterDescription.innerText = hotMovies[0].overview;
  posterImage.src = IMAGE_BASE + hotMovies[0].poster_path;
  hotMovies.forEach((hotMovie) => {
    const card = createCard(hotMovie);
    hotMoviesContainer.appendChild(card);
  });
});

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

// populate recommendations on local storage changing
window.addEventListener("storage", () => {
  console.log("something happened");
  populateFavs();
});
