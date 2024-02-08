const movieContainer = document.getElementById('modal-body');
const searchMoviesBtn = document.getElementById('searchBtn');
const searchResultsModal = document.getElementById('searchResultsModal');

const watchLibraryContainer = document.getElementById('displayContainer');
const watchLibraryBtn = document.getElementById('watch-library-button');
const watchLibraryheading = document.getElementById('w-l-heading');
const watchLibrarySlogan = document.getElementById('w-l-info');
const saveChangesBtn = document.getElementById('save-changes-btn');

const defaultImageURL = './assets/media/defaultmovieimage.jpg';
// Retrieve saved movies from local storage
var savedmovies = JSON.parse(localStorage.getItem('savedmovies')) || [];
var searchValue = document.getElementById('searchValue');

// fetching results, opening a modal, displaying the results
searchMoviesBtn.addEventListener('click', function(e) {
  e.preventDefault();

  // Check if the searchValue is empty
  if (!searchValue.value.trim()) {
    alert('Please enter a search value.');
    return;
  }

  var queryString = `https://www.omdbapi.com/?s=${searchValue.value}&i=tt3896198&apikey=9a161259&plot=full&r=json`;
  fetch(queryString)
    .then((res) => res.json())
    .then((data) => {
      let results = data.Search;
      movieContainer.innerHTML = '';

      results.forEach((item) => {
        console.log(item);
        let movieDiv = document.createElement('div');
        movieDiv.innerHTML = `
          <div class='card d-flex justify-content-center align-items-center'>
            <h4>${item.Title}</h4>
            <img class='img-formatting' src='${item.Poster !== 'N/A' ? item.Poster : defaultImageURL}' alt='${item.Title}'>
            <button id='${item.imdbID}' class='btn fa-large fa-bookmark' type='submit' value='${item.imdbID}'></button>
          </div>
        `;
        movieContainer.append(movieDiv);

        let bookmarkBtn = document.getElementById(`${item.imdbID}`);
        bookmarkBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (e.target.value === item.imdbID) {
            // Save the movie to local storage
            savedmovies.push(item);
            savedmovies = checkDuplicates(savedmovies);
            localStorage.setItem('savedmovies', JSON.stringify(savedmovies));
            renderSavedMovie();
          }
        });
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

// watchLibraryBtn.addEventListener('click', function() {
//   showWatchLibrary();
//   renderSavedMovie();
// });

saveChangesBtn.addEventListener('click', function() {
  var modal = bootstrap.Modal.getInstance(searchResultsModal); // Retrieve the modal instance
  modal.hide();
});

function renderSavedMovie() {
  // Clear existing content
  watchLibraryContainer.innerHTML = '';

  savedmovies.forEach(function(movie) {
    let savedmovieDiv = document.createElement('div');
    savedmovieDiv.className = 'card mb-3';
    savedmovieDiv.style.maxWidth = '300px';

    // Use the movie poster if available, otherwise use the default image
    const imageUrl = movie.Poster !== 'N/A' ? movie.Poster : defaultImageURL;

    savedmovieDiv.innerHTML =
      `<img src='${imageUrl}' class='card-img-top' alt='${movie.Title}'>
      <div class='card-body'>
        <h5 class='card-title'>${movie.Title}</h5>
        <p class='card-text'>
          This is a wider card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <p>TMDB Rating: ${movie.Ratings && movie.Ratings[0] ? movie.Ratings[0].Value : 'N/A'}</p>
        <button class='btn btn-primary' onclick="removeMovie('${movie.imdbID}')">Remove</button>
      </div>`;

    watchLibraryContainer.appendChild(savedmovieDiv);
  })  
}

function removeMovie(imdbID) {
  // Remove the movie from savedmovies array
  savedmovies = savedmovies.filter((movie) => movie.imdbID !== imdbID);
  // Update local storage
  localStorage.setItem('savedmovies', JSON.stringify(savedmovies));
  // Render the updated list
  renderSavedMovie();
}

function checkDuplicates(arr) {
  return arr.filter((value, index) => arr.findIndex((movie) => movie.imdbID === value.imdbID) === index);
}

function showWatchLibrary() {
  watchLibraryheading.classList.add('hide');
  watchLibrarySlogan.classList.add('hide');
  watchLibraryBtn.classList.add('hide');
}

// TMDb API Key
const apiKey = 'c765a205274e5ae2e4ea7651076c9be2';
// Function to fetch top movies or top series based on the category parameter
async function fetchTopContent(category) {
  let endpoint;
  if (category === 'movies') {
    endpoint = 'movie/top_rated';
  } else if (category === 'series') {
    endpoint = 'tv/top_rated';
  }
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}

// Fetch top content and render cards
async function renderTopContent(category) {
  const topContent = await fetchTopContent(category);
  for (let i = 1; i <= 12; i++) {
    const content = topContent[i - 1];
    let overview = content.overview;
    overview = overview.replace("'", "");
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

 window.onload = renderMovieCards;
