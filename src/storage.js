export { addMovieToFavs, getFavs };
// add movie to to local storage
function addMovieToFavs(movie) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  if (favs.includes(movie)) {
    return;
  }
  localStorage.setItem("favs", JSON.stringify([...favs, movie]));
}

// retrieve movies from local storage
function getFavs(movies) {
  return JSON.parse(localStorage.getItem("favs")) || [];
}
