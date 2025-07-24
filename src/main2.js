import { fetchSearchMovies, fetchHotMovies } from "./network.js";
import { createCard } from "./ui.js";
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const searchButton = document.querySelector("#searchButton");
const closeButton = document.querySelector("#closeButton");
const searchInput = document.querySelector("#searchInput");
const hotMoviesContainer = document.getElementById("hotMovies");
const scrollLeft = document.querySelector("#scrollLeft");
const scrollRight = document.querySelector("#scrollRight");

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

// retrieving and rendering hot movies on page load
window.addEventListener("load", async () => {
  const hotMovies = await fetchHotMovies();
  hotMovies.forEach((hotMovie) => {
    const card = createCard(hotMovie);
    hotMoviesContainer.appendChild(card);
  });
});

//Home Button Redirecting

// const redirectButton = document.getElementById("directing");
// const secondRedirecting = document.getElementById("redirecting2");

// redirectButton.addEventListener("submit", () => {
//   window.location.href = "journal.html";
// });

// secondRedirecting.addEventListener("click", () => {
//   window.location.href = "journal.html";
// });
