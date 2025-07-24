export { addMovieToFavs, getFavs, getFavsIDs };
// add movie to to local storage
function addMovieToFavs(movie) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  const favsIDs = JSON.parse(localStorage.getItem("favsIDs")) || [];
  localStorage.setItem("favs", JSON.stringify([...favs, movie]));
  localStorage.setItem("favsIDs", JSON.stringify([...favsIDs, movie.id]));
}

// retrieve movies from local storage
function getFavs() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}

// retieve favs ids
function getFavsIDs() {
  return JSON.parse(localStorage.getItem("favsIDs")) || [];
}
