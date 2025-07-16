const API_KEY = "ae9417b72a04e975455b2ed2ac2a7001";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

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

async function loadModal() {
  const res = await fetch('components/popup.html')

  const notificationHTML = await (await fetch('components/notification.html')).text()
  const modalHTML = await res.text();

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.insertAdjacentHTML('beforeend', notificationHTML);


  function closeModal () {
    const modal = document.getElementById("movieModal"); 
    document.getElementById("movieModal").classList.remove("opacity-100", "scale-100", "pointer-events-auto");
    document.getElementById("movieModal").classList.add("opacity-0", "scale-95", "pointer-events-none");
   
  setTimeout(() => {
    document.getElementById("movieModal").classList.add("hidden")
  }, 300)
  }
  
  document.getElementById("closeModal").addEventListener("click", closeModal)

  document.getElementById("addToFavorite").addEventListener("click", () => {
    console.log(`added  to favorites`)
    closeModal()

  setTimeout(()=> {
    const container = document.getElementById("notificationModal")
    const text = document.getElementById("modalText")
    text.textContent = "Added to Favorites"
    

    container.classList.remove("hidden", "opacity-0", "scale-95")
    container.classList.add("opacity-100", "scale-100")
   

    setTimeout(() => {
      container.classList.add("hidden", "opacity-0", "scale-95")
      container.classList.remove("opacity-100", "scale-100")
      text.textContent = ""}
     , 1000 )
  }, 1000)
    

  });

}

// Run on page load--------------------------
loadModal()
fetchPopularMovies()


//Movie card-------------------------------------------------------

function handleClick(movie) {
    const modal = document.getElementById("movieModal")
    const title = document.getElementById("modalTitle")
    const description = document.getElementById("modalDescription")
    const image = document.getElementById("modalImage")
   const rating = document.getElementById("modalRating")
     const release = document.getElementById("modalRelease")


    title.textContent = movie.title
    description.textContent = movie.overview
    rating.textContent = "Rating: " +  movie.vote_average
     release.textContent = "Release Date: " + movie.release_date

    const imagePath = movie.backdrop_path || movie.poster_path || ''
    if (imagePath) {
        image.style.backgroundImage = `url(${IMAGE_BASE + imagePath})`
    } else {
        image.style.backgroundImage = ''
    }

  modal.classList.remove("hidden")
  modal.classList.add("opacity-0", "scale-95", "pointer-events-none")
  modal.classList.remove("opacity-100", "scale-100", "pointer-events-auto")

  requestAnimationFrame(() => {
    modal.classList.remove("opacity-0", "scale-95", "pointer-events-none")
    modal.classList.add("opacity-100", "scale-100", "pointer-events-auto")
  })

}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";

    card.innerHTML = `
      <a target="_blank" class="block hover:opacity-80 transition" id="movieCard">
        <img class="bg-contain" src="${IMAGE_BASE + movie.poster_path}" width=100% alt="${
      movie.title
    }" class="h-80 object-cover">
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
    
    
    

    card.addEventListener("click", () => {
      handleClick(movie);
    });

    moviesContainer.appendChild(card);

    

  });
  
}


