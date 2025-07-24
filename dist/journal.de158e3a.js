const API_KEY = "ae9417b72a04e975455b2ed2ac2a7001";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
// Add these missing variables
let allMovies = [];
let selectedGenres = new Set();
async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    console.log(data.genres);
    return data.genres;
}
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        allMovies = data.results;
        displayMovies(allMovies);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}
async function loadModal() {
    const res = await fetch('components/popup.html');
    const notificationHTML = await (await fetch('components/notification.html')).text();
    const modalHTML = await res.text();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.insertAdjacentHTML('beforeend', notificationHTML);
    function closeModal() {
        const modal = document.getElementById("movieModal");
        document.getElementById("movieModal").classList.remove("opacity-100", "scale-100", "pointer-events-auto");
        document.getElementById("movieModal").classList.add("opacity-0", "scale-95", "pointer-events-none");
        setTimeout(()=>{
            document.getElementById("movieModal").classList.add("hidden");
        }, 300);
    }
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("addToFavorite").addEventListener("click", ()=>{
        console.log(`added  to favorites`);
        closeModal();
        setTimeout(()=>{
            const container = document.getElementById("notificationModal");
            const text = document.getElementById("modalText");
            text.textContent = "Added to Favorites";
            container.classList.remove("hidden", "opacity-0", "scale-95");
            container.classList.add("opacity-100", "scale-100");
            setTimeout(()=>{
                container.classList.add("hidden", "opacity-0", "scale-95");
                container.classList.remove("opacity-100", "scale-100");
                text.textContent = "";
            }, 1000);
        }, 1000);
    });
}
// Run on page load--------------------------
loadModal();
fetchPopularMovies();
fetchGenres();
//Movie card-------------------------------------------------------
function handleClick(movie) {
    const modal = document.getElementById("movieModal");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const image = document.getElementById("modalImage");
    const rating = document.getElementById("modalRating");
    const release = document.getElementById("modalRelease");
    title.textContent = movie.title;
    description.textContent = movie.overview;
    rating.textContent = "Rating: " + movie.vote_average;
    release.textContent = "Release Date: " + movie.release_date;
    const imagePath = movie.backdrop_path || movie.poster_path || '';
    if (imagePath) image.style.backgroundImage = `url(${IMAGE_BASE + imagePath})`;
    else image.style.backgroundImage = '';
    modal.classList.remove("hidden");
    modal.classList.add("opacity-0", "scale-95", "pointer-events-none");
    modal.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
    requestAnimationFrame(()=>{
        modal.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        modal.classList.add("opacity-100", "scale-100", "pointer-events-auto");
    });
}
async function displayGenreFilters() {
    const genres = await fetchGenres();
    const filterContainer = document.getElementById("genreFilters");
    console.log("displayGenre Filter");
    genres.forEach((genre)=>{
        const pill = document.createElement("button");
        pill.textContent = genre.name;
        pill.className = "bg-gray-800 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 hover:shadow-xl shadow-(color: red) border-gray-400 border-[1px] transition pointer-cursor";
        pill.dataset.genreId = genre.id;
        pill.addEventListener("click", ()=>{
            if (selectedGenres.has(genre.id)) {
                selectedGenres.delete(genre.id);
                pill.classList.remove("bg-red-600");
            } else {
                selectedGenres.add(genre.id);
                pill.classList.add("bg-red-600");
            }
            filterMoviesByGenres();
        });
        filterContainer.appendChild(pill);
    });
}
function filterMoviesByGenres() {
    if (selectedGenres.size === 0) {
        displayMovies(allMovies);
        return;
    }
    const filtered = allMovies.filter((movie)=>{
        return movie.genre_ids.some((id)=>selectedGenres.has(id));
    });
    displayMovies(filtered);
}
// Wait for DOM to load before setting up event listeners
document.addEventListener('DOMContentLoaded', ()=>{
    // Initialize genre filters after DOM is ready
    displayGenreFilters();
    // Set up filter panel toggle
    const openFilterBtn = document.getElementById("openFilter");
    if (openFilterBtn) openFilterBtn.addEventListener("click", ()=>{
        const panel = document.getElementById("genreFilters");
        panel.classList.toggle("hidden");
    });
    // Set up search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.addEventListener("input", (e)=>{
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") {
            // If search is empty, show filtered movies based on selected genres
            filterMoviesByGenres();
            return;
        }
        // Filter movies based on search term and selected genres
        let moviesToSearch = allMovies;
        // First apply genre filter if any genres are selected
        if (selectedGenres.size > 0) moviesToSearch = allMovies.filter((movie)=>{
            return movie.genre_ids.some((id)=>selectedGenres.has(id));
        });
        // Then apply search filter
        const searchResults = moviesToSearch.filter((movie)=>{
            return movie.title.toLowerCase().includes(searchTerm) || movie.overview.toLowerCase().includes(searchTerm);
        });
        displayMovies(searchResults);
    });
});
function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "";
    movies.forEach((movie)=>{
        const card = document.createElement("div");
        card.className = "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";
        card.innerHTML = `
      <div class="block hover:opacity-80 transition cursor-pointer">
        <img class="bg-contain" src="${IMAGE_BASE + movie.poster_path}" width=100% alt="${movie.title}" class="h-80 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
          <p class="text-sm text-gray-400">${movie.overview.slice(0, 90)}...</p>
          <p class="text-sm text-gray-400 mt-2">Release Date: ${movie.release_date}</p>
          <p class="text-sm text-yellow-400">Rating: ${movie.vote_average}</p>
        </div>
      </div>
    `;
        card.addEventListener("click", ()=>{
            handleClick(movie);
        });
        moviesContainer.appendChild(card);
    });
}

//# sourceMappingURL=journal.de158e3a.js.map
