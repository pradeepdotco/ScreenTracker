const movieContainer = document.getElementById('modal-body');
const searchMoviesBtn = document.getElementById('searchBtn');
const searchResultsModal = document.getElementById('searchResultsModal');

const watchLibraryContainer = document.getElementById('displayContainer');
const watchLibraryBtn = document.getElementById('w-l-button');
const watchLibraryBtnWrapper = document.getElementById('w-l-button-wrapper');
const watchLibraryheading = document.getElementById('w-l-heading');
const watchLibrarySlogan = document.getElementById('w-l-info');
const saveChangesBtn = document.getElementById('save-changes-btn');

const defaultImageURL = './assets/media/defaultmovieimage.jpg';
// Retrieve saved movies from local storage
var savedmovies = JSON.parse(localStorage.getItem('savedmovies')) || [];
const searchQuery = document.getElementById('searchValue');

// fetching results, opening a modal, displaying the results
searchMoviesBtn.addEventListener('click', function(e) {
  e.preventDefault();
  
  var searchValue = searchQuery.value.trim()
  // Check if the searchValue is empty
  if (!searchValue) {
    alert('Please enter a search value.');
    return;
  }

  // var queryString = `https://www.omdbapi.com/?s=${searchValue.value}&i=tt3896198&apikey=9a161259&plot=full&r=json`;
  var queryString = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBApiKey}&query=${searchValue}`
  fetch(queryString)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results)
      let results = data.results;
      movieContainer.innerHTML = '';

      results.forEach((result) => {
        // console.log(item);
        result.overview = result.overview.replace("'", "")
        let imgPath = result.poster_path
        let imgSrc = `https://image.tmdb.org/t/p/w500${imgPath}`
        if(imgPath === null) {
          imgSrc = defaultImageURL
        }
        let movieDiv = document.createElement('div');
        movieDiv.innerHTML = `
          
          <div class="card mb-4">
            <img src="${imgSrc}" alt="${result.title}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${result.title}</h5>
              <p class="card-text">${result.overview}</p>
              <p class="card-text">Rating: ${result.vote_average}</p>
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addToList('${result.id}', '${formatString(result.title)}', '${result.poster_path}', '${formatString(result.overview)}', '${result.vote_average}')">Add to List</button>
            </div>
          </div>
        `;
        movieContainer.append(movieDiv);
      });
    })
    .catch((err) => console.log(err));
});


function addToList(imdbID, title, poster, plot, tmdbRating) {
  // Check if the movie is already in the watch library
  if (savedmovies.some(movie => movie.imdbID === imdbID)) {
    alert('This movie is already in your watch library.');
    return;
  }

  // Create a movie object
  const movie = {
    imdbID: imdbID,
    Title: title,
    Poster: poster,
    Plot: plot,
    Ratings: [{ Source: 'TMDB', Value: tmdbRating }]
  };

  // Save the movie to local storage
  savedmovies.push(movie);
  savedmovies = checkDuplicates(savedmovies);
  localStorage.setItem('savedmovies', JSON.stringify(savedmovies));

  // Render the updated watch library
  renderSavedMovie();
}

watchLibraryBtn.addEventListener('click', function() {
  showWatchLibrary();
  renderSavedMovie();
});

saveChangesBtn.addEventListener('click', function() {
  var modal = bootstrap.Modal.getInstance(searchResultsModal); // Retrieve the modal instance
  modal.hide();
});


function renderSavedMovie() {
  // Fetch missing images before rendering
  // fetchMissingImages();

  // Clear existing content
  watchLibraryContainer.innerHTML = '';

  if (savedmovies.length === 0) {
    watchLibraryContainer.innerHTML = `
      <div class=''>Your watch library is empty!</div>
    `
  }
  
  savedmovies.forEach(function(movie) {
    console.log(movie)
    let savedmovieDiv = document.createElement('div');
    savedmovieDiv.className = 'card mb-3 text-wrap';
    savedmovieDiv.style.maxWidth = '300px';

    // Use the movie poster if available, otherwise use the default image
    let imgSrc = `https://image.tmdb.org/t/p/w500${movie.Poster}`
    if (movie.Poster === 'null') {
      imgSrc = defaultImageURL
    }
    savedmovieDiv.innerHTML =
      `<img class='img-formatting' src='${imgSrc}' class='card-img-top' alt='${movie.Title}'>
      <div class='card-body'>
        <h5 class='card-title'>${movie.Title}</h5>
        <p class='card-text'>
          ${movie.Plot || 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'}
        </p>
        <p>TMDB Rating: ${movie.Ratings && movie.Ratings[0] ? movie.Ratings[0].Value : 'N/A'}</p>
        <button class="btn btn-sm btn-danger" onclick="removeMovie('${movie.imdbID}')">Remove</button>
      </div>`;

    watchLibraryContainer.appendChild(savedmovieDiv);
  });
}

function removeMovie(imdbID) {
  // Remove the movie from savedmovies array
  savedmovies = savedmovies.filter((movie) => movie.imdbID !== imdbID)
  // Update local storage
  localStorage.setItem('savedmovies', JSON.stringify(savedmovies))
  // Render the updated list
  renderSavedMovie()
}

function checkDuplicates(arr) {
  return arr.filter((value, index) => arr.findIndex((movie) => movie.imdbID === value.imdbID) === index)
}

function formatString(str) {
  str = str.replace(/'/g, '')
  return str
}

function showWatchLibrary() {
  // watchLibraryheading.classList.add('hide')
  watchLibraryheading.classList.add('m-t-1')
  watchLibrarySlogan.classList.add('hide')
  watchLibraryBtnWrapper.classList.add('hide')
}

// TMDb API Key
const TMDBApiKey = 'c765a205274e5ae2e4ea7651076c9be2';
// Function to fetch top movies or top series based on the category parameter
async function fetchTopContent(category) {
  let endpoint;
  if (category === 'movies') {
    endpoint = 'movie/top_rated';
  } else if (category === 'series') {
    endpoint = 'tv/top_rated';
  }
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${TMDBApiKey}`);
  const data = await response.json();
  return data.results;
}

// Fetch top content and render cards
async function renderTopContent(category) {
  const topContent = await fetchTopContent(category);
  for (let i = 1; i <= 12; i++) {
    const content = topContent[i - 1];
    let overview = content.overview || '';
    overview = overview.replace("'", " ");
    console.log(overview)
    const cardElement = document.getElementById(`card${i}`);
    const cardContent = `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm" style="width: 12rem;">
          <img src="https://image.tmdb.org/t/p/w500${content.poster_path}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
          <div class="card-body">
            <h5 class="card-title">
              ${content.title || content.name}
            </h5>
            <div class="d-flex justify-content-between align-items-center">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="toggleOverview('card${i}')">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addToList('${content.id}', '${content.title || content.name}', '${content.poster_path}', '${overview}', '${content.vote_average}')">Add to List</button>
            </div>
            <p class="card-text overview" style="display: none;">${content.overview}</p>
            <p class="card-text">Rating: ${content.vote_average}</p>
          </div>
        </div>
      </div>
    `;
    cardElement.innerHTML = cardContent;
  }
}

// Function to add a movie to the list
document.getElementById('topMoviesButton').addEventListener('click', function () {
  renderTopContent('movies');
});

// function to add series to the list
document.getElementById('topSeriesButton').addEventListener('click', function () {
  renderTopContent('series');
});

// view the overview of the movie
function toggleOverview(cardId) {
  const overviewElement = document.querySelector(`#${cardId} .card-text.overview`);
  overviewElement.style.display = overviewElement.style.display === 'none' ? 'block' : 'none';
}

// window.onload = renderMovieCards;

// trailer code 
function searchTrailer() {
  const apiKey = 'AIzaSyBTkJPldmgGn0_lxLIhaQ0kqshfmKztDG0'; // YouTube API key
  const filmTitle = document.getElementById('trailerInput').value;
  if (!filmTitle) {
   alert('Please enter a movie title.');
   return;
  }
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${filmTitle} trailer&type=video&key=${apiKey}`;
  fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
    if (data.items.length > 0) {
     const firstVideoId = data.items[0].id.videoId;
     const videoContainer = document.getElementById('videoContainer');
     // Embedding the YouTube video player or perform any other action
     videoContainer.innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${firstVideoId}" frameborder="0" allowfullscreen></iframe>
     `;
    } else {
     alert('Trailer not found.');
    }
   })
   .catch(error => console.error('API call failed:', error));
}

 document.cookie = "cookieName=cookieValue; SameSite=None; Secure";