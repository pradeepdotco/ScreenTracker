// const movieContainer = document.getElementById('modal-body');
// const searchMoviesBtn = document.getElementById('searchBtn');
// const searchResultsModal = document.getElementById('searchResultsModal');

// const watchLibraryContainer = document.getElementById('displayContainer');
// const watchLibraryBtn = document.getElementById('watch-library-button');
// const watchLibraryheading = document.getElementById('w-l-heading');
// const watchLibrarySlogan = document.getElementById('w-l-info');
// const saveChangesBtn = document.getElementById('save-changes-btn');

// const defaultImageURL = 'defaultmovieimage.jpg';
// // Retrieve saved movies from local storage
// var savedmovies = JSON.parse(localStorage.getItem('savedmovies')) || [];
// var searchValue = document.getElementById('searchValue');
// var tmdbData = [];

// // fetching results, opening a modal, displaying the results
// searchMoviesBtn.addEventListener('click', function (e) {
//   e.preventDefault();

//   // Check if the searchValue is empty
//   if (!searchValue.value.trim()) {
//     alert('Please enter a search value.');
//     return;
//   }

//   fetchTmdbData(searchValue.value);
// });

// async function fetchTmdbData(searchQuery) {
//   const apiKey = 'c765a205274e5ae2e4ea7651076c9be2';
//   const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
//   const data = await response.json();

//   let results = data.results;
//   movieContainer.innerHTML = '';

//   results.forEach((item) => {
//     console.log(item);
//     let movieDiv = document.createElement('div');
//     movieDiv.innerHTML = `
//       <div class='card d-flex justify-content-center align-items-center'>
//         <h4>${item.title}</h4>
//         <img class='img-formatting' src='${item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : defaultImageURL}' alt='${item.title}'>
//         <button id='${item.id}' class='btn fa-large fa-bookmark' type='submit' value='${item.id}'></button>
//       </div>
//     `;
//     movieContainer.append(movieDiv);

//     let bookmarkBtn = document.getElementById(`${item.id}`);
//     bookmarkBtn.addEventListener('click', function (e) {
//       e.preventDefault();
//       console.log(e.target.value)
//       // if (e.target.value === item.id) {
//         // Save the movie to local storage
//         addToList(item.id, item.title, item.poster_path, item.overview, item.vote_average);
//       // }
//     });
//   });
// }

// function addToList(id, title, poster, plot, tmdbRating) {
//   // Check if the movie is already in the watch library
//   if (savedmovies.some(movie => movie.id === id)) {
//     alert('This movie is already in your watch library.');
//     return;
//   }

//   // Create a movie object
//   const movie = {
//     id: id,
//     title: title,
//     poster: poster,
//     plot: plot,
//     ratings: [{ source: 'TMDB', value: tmdbRating }]
//   };

//   // Save the movie to local storage
//   savedmovies.push(movie);
//   savedmovies = checkDuplicates(savedmovies);
//   localStorage.setItem('savedmovies', JSON.stringify(savedmovies));

//   // Render the updated watch library
//   renderSavedMovie();
// }

// watchLibraryBtn.addEventListener('click', function (e) {
//   showWatchLibrary();
//   renderSavedMovie();
//   const removeBtn = e.target.closest('.removeBtn');
//   if (removeBtn) {
//     const movieId = removeBtn.getAttribute('data-id');
//     removeMovie(movieId);
//   }
// });

// saveChangesBtn.addEventListener('click', function () {
//   var modal = bootstrap.Modal.getInstance(searchResultsModal); // Retrieve the modal instance
//   modal.hide();
// });

// // function renderSavedMovie() {
// //   // Clear existing content
// //   watchLibraryContainer.innerHTML = '';

// //   savedmovies.forEach(function (movie) {
// //     let savedmovieDiv = document.createElement('div');
// //     savedmovieDiv.className = 'card mb-3';
// //     savedmovieDiv.style.maxWidth = '300px';

// //     // Use the movie poster if available, otherwise use the default image
// //     const imageUrl = movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : defaultImageURL;

// //     savedmovieDiv.innerHTML =
// //       `<img src='${imageUrl}' class='card-img-top' alt='${movie.title}'>
// //       <div class='card-body'>
// //         <h5 class='card-title'>${movie.title}</h5>
// //         <p class='card-text'>
// //           ${movie.plot || 'No plot available.'}
// //         </p>
// //         <p>TMDB Rating: ${movie.ratings && movie.ratings[0] ? movie.ratings[0].value : 'N/A'}</p>
// //         <button class='btn btn-primary'class='removeBtn' )">Remove</button>
// //       </div>`;

// //     watchLibraryContainer.appendChild(savedmovieDiv);
// //   });
// // }



// function renderSavedMovie() {
//   // Clear existing content
//   watchLibraryContainer.innerHTML = '';

//   savedmovies.forEach(function (movie) {
//     let savedmovieDiv = document.createElement('div');
//     savedmovieDiv.className = 'card mb-3';
//     savedmovieDiv.style.maxWidth = '300px';

//     // Use the movie poster if available, otherwise use the default image
//     const imageUrl = movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : defaultImageURL;

//     savedmovieDiv.innerHTML =
//       `<img src='${imageUrl}' class='card-img-top' alt='${movie.title}'>
//       <div class='card-body'>
//         <h5 class='card-title'>${movie.title}</h5>
//         <p class='card-text'>
//           ${movie.plot || 'No plot available.'}
//         </p>
//         <p>TMDB Rating: ${movie.ratings && movie.ratings[0] ? movie.ratings[0].value : 'N/A'}</p>
//         <button class='btn btn-primary removeBtn' data-id='${movie.id}'>Remove</button>
//       </div>`;

//     watchLibraryContainer.appendChild(savedmovieDiv);
//   });
// }



// // onclick="removeMovie('${movie.id}'

// function removeMovie(id) {
//   // Remove the movie from savedmovies array
//   savedmovies = savedmovies.filter((movie) => movie.id !== id);
//   // Update local storage
//   localStorage.setItem('savedmovies', JSON.stringify(savedmovies));
//   // Render the updated list
//   renderSavedMovie();
// }

// function checkDuplicates(arr) {
//   return arr.filter((value, index) => arr.findIndex((movie) => movie.id === value.id) === index);
// }

// function showWatchLibrary() {
//   watchLibraryheading.classList.add('hide');
//   watchLibrarySlogan.classList.add('hide');
//   watchLibraryBtn.classList.add('hide');
// }

// // TMDb API Key
// const apiKey = 'c765a205274e5ae2e4ea7651076c9be2';
// // Function to fetch top movies or top series based on the category parameter
// async function fetchTopContent(category) {
//   let endpoint;
//   if (category === 'movies') {
//     endpoint = 'movie/top_rated';
//   } else if (category === 'series') {
//     endpoint = 'tv/top_rated';
//   }
//   const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`);
//   const data = await response.json();
//   tmdbData = data.results;
//   return tmdbData;
// }

// // Fetch top content and render cards
// async function renderTopContent(category) {
//   const topContent = await fetchTopContent(category);
//   for (let i = 1; i <= 12; i++) {
//     const content = topContent[i - 1];
//     let overview = content.overview;
//     overview = overview.replace("'", "");
//     console.log(overview);
//     const cardElement = document.getElementById(`card${i}`);
//     const cardContent = `
//       <div class="col-md-4 mb-4">
//         <div class="card shadow-sm" style="width: 12rem;">
//           <img src="https://image.tmdb.org/t/p/w500${content.poster_path}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
//           <div class="card-body">
//             <h5 class="card-title">
//               ${content.title || content.name}
//             </h5>
//             <div class="d-flex justify-content-between align-items-center">
//               <button type="button" class="btn btn-sm btn-outline-secondary" onclick="toggleOverview('card${i}')">View</button>
//               <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addToList('${content.id}', '${content.title || content.name}', '${content.poster_path}', '${overview}', '${content.vote_average}')">Add to List</button>
//             </div>
//             <p class="card-text overview" style="display: none;">${content.overview}</p>
//             <p class="card-text">Rating: ${content.vote_average}</p>
//           </div>
//         </div>
//       </div>
//     `;
//     cardElement.innerHTML = cardContent;
//   }
// }

// // Function to add a movie to the list
// document.getElementById('topMoviesButton').addEventListener('click', function () {
//   renderTopContent('movies');
// });

// // function to add series to the list
// document.getElementById('topSeriesButton').addEventListener('click', function () {
//   renderTopContent('series');
// });

// // view the overview of the movie
// function toggleOverview(cardId) {
//   const overviewElement = document.querySelector(`#${cardId} .card-text.overview`);
//   overviewElement.style.display = overviewElement.style.display === 'none' ? 'block' : 'none';
// }






const movieContainer = document.getElementById('modal-body');
const searchMoviesBtn = document.getElementById('searchBtn');
const searchResultsModal = document.getElementById('searchResultsModal');

const watchLibraryContainer = document.getElementById('displayContainer');
const watchLibraryBtn = document.getElementById('watch-library-button');
const watchLibraryheading = document.getElementById('w-l-heading');
const watchLibrarySlogan = document.getElementById('w-l-info');
const saveChangesBtn = document.getElementById('save-changes-btn');

const defaultImageURL = 'defaultmovieimage.jpg';
// Retrieve saved movies from local storage
var savedmovies = JSON.parse(localStorage.getItem('savedmovies')) || [];
var searchValue = document.getElementById('searchValue');
var tmdbData = [];

// fetching results, opening a modal, displaying the results
searchMoviesBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // Check if the searchValue is empty
  if (!searchValue.value.trim()) {
    alert('Please enter a search value.');
    return;
  }

  fetchTmdbData(searchValue.value);
});

async function fetchTmdbData(searchQuery) {
  const apiKey = 'c765a205274e5ae2e4ea7651076c9be2';
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
  const data = await response.json();

  let results = data.results;
  movieContainer.innerHTML = '';

  results.forEach((item) => {
    console.log(item);
    let movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
      <div class='card d-flex justify-content-center align-items-center'>
        <h4>${item.title}</h4>
        <img class='img-formatting' src='${item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : defaultImageURL}' alt='${item.title}'>
        <button id='${item.id}' class='btn fa-large fa-bookmark' type='submit' value='${item.id}'></button>
      </div>
    `;
    movieContainer.append(movieDiv);

    let bookmarkBtn = document.getElementById(`${item.id}`);
    bookmarkBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(e.target.value)
      // if (e.target.value === item.id) {
        // Save the movie to local storage
        addToList(item.id, item.title, item.poster_path, item.overview, item.vote_average);
      // }
    });
  });
}

// Attach event listener to watchLibraryContainer and delegate to remove buttons
watchLibraryContainer.addEventListener('click', function (e) {
  const removeBtn = e.target.closest('.removeBtn');
  if (removeBtn) {
    const movieId = removeBtn.getAttribute('data-id');
    removeMovie(movieId);
  }
});

function addToList(id, title, poster, plot, tmdbRating) {
  // Check if the movie is already in the watch library
  if (savedmovies.some(movie => movie.id === id)) {
    alert('This movie is already in your watch library.');
    return;
  }

  // Create a movie object
  const movie = {
    id: id,
    title: title,
    poster: poster,
    plot: plot,
    ratings: [{ source: 'TMDB', value: tmdbRating }]
  };

  // Save the movie to local storage
  savedmovies.push(movie);
  savedmovies = checkDuplicates(savedmovies);
  localStorage.setItem('savedmovies', JSON.stringify(savedmovies));

  // Render the updated watch library
  renderSavedMovie();
}

watchLibraryBtn.addEventListener('click', function (e) {
  showWatchLibrary();
  renderSavedMovie();
});

saveChangesBtn.addEventListener('click', function () {
  var modal = bootstrap.Modal.getInstance(searchResultsModal); // Retrieve the modal instance
  modal.hide();
});

function renderSavedMovie() {
  // Clear existing content
  watchLibraryContainer.innerHTML = '';

  savedmovies.forEach(function (movie) {
    let savedmovieDiv = document.createElement('div');
    savedmovieDiv.className = 'card mb-3';
    savedmovieDiv.style.maxWidth = '300px';

    // Use the movie poster if available, otherwise use the default image
    const imageUrl = movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : defaultImageURL;

    savedmovieDiv.innerHTML =
      `<img src='${imageUrl}' class='card-img-top' alt='${movie.title}'>
      <div class='card-body'>
        <h5 class='card-title'>${movie.title}</h5>
        <p class='card-text'>
          ${movie.plot || 'No plot available.'}
        </p>
        <p>TMDB Rating: ${movie.ratings && movie.ratings[0] ? movie.ratings[0].value : 'N/A'}</p>
        <button class='btn btn-primary removeBtn' data-id='${movie.id}'>Remove</button>
      </div>`;

    watchLibraryContainer.appendChild(savedmovieDiv);
  });
}

function removeMovie(id) {
  // Remove the movie from savedmovies array
  savedmovies = savedmovies.filter((movie) => movie.id !== id);
  // Update local storage
  localStorage.setItem('savedmovies', JSON.stringify(savedmovies));
  // Render the updated list
  renderSavedMovie();
}

function checkDuplicates(arr) {
  return arr.filter((value, index) => arr.findIndex((movie) => movie.id === value.id) === index);
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
  tmdbData = data.results;
  return tmdbData;
}

// Fetch top content and render cards
async function renderTopContent(category) {
  const topContent = await fetchTopContent(category);
  for (let i = 1; i <= 12; i++) {
    const content = topContent[i - 1];
    let overview = content.overview;
    overview = overview.replace("'", "");
    console.log(overview);
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
