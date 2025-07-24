export { addMovieToFavs };
// localStorage favorites
function addMovieToFavs(movie) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  if (favs.includes(movie)) {
    return;
  }
  localStorage.setItem("favs", JSON.stringify([...favs, movie]));
}
