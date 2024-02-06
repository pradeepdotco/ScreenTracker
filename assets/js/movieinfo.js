var searchValue = document.getElementById('searchValue')
const movieContainer = document.getElementById('modal-body')
var searchMoviesBtn = document.getElementById('searchBtn')

// fetching results, opening a modal, displaying the results
searchMoviesBtn.addEventListener('click', function(e) {
  e.preventDefault()
  console.log(e.target)
  var queryString = `https://www.omdbapi.com/?s=${searchValue.value}&i=tt3896198&apikey=9a161259`
  fetch(queryString).then(res => {
    return res.json()
  }).then(data => {
    console.log(data)
    let results = data.Search
    movieContainer.innerHTML = ''
    results.forEach((item) => {
      let movieDiv = document.createElement('div')
      movieDiv.classList.add('card')
      createCard(movieDiv, item)
    })
  })
})


// creating the card for how each movie search result should look when displayed
function createCard(div, item) {
  div.classList.add('card', 'd-flex', 'justify-content-center', 'align-items-center')
  let img = document.createElement('img')
  img.src = item.Poster
  img.alt = item.Title
  let div2 = document.createElement('div')
  div2.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center')
  let h5 = document.createElement('h5')
  h5.classList.add('card-title', 'text-center')
  h5.textContent = item.Title
  let p = document.createElement('p')
  p.classList.add('card-text')
  p.textContent = item.Plot
  let bookmark = document.createElement('i')
  bookmark.innerHTML = "<i class='fa-regular fa-bookmark'></i>"
  // btn.classList.add('btn', 'btn-primary')
  div2.append(h5, p, bookmark)
  div.append(img, div2)
  movieContainer.append(div)
  return movieContainer
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
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addToList('card${i}')">Add to List</button>
            </div>
            <p class="card-text overview" style="display: none;">${content.overview}</p>
          <p class="card-text">Rating: ${content.vote_average}</p>
        </div>
      </div>
    `;

  cardElement.innerHTML = cardContent;
}
}
// Function to add a movie the list
document.getElementById('topMoviesButton').addEventListener('click', function () {
renderTopContent('movies');
});
// function to add series to the list
document.getElementById('topSeriesButton').addEventListener('click', function () {
renderTopContent('series');
});
// view the overview of the movie
function toggleOverview(cardId) {
  const cardElement = document.getElementById(cardId);
  const overviewElement = cardElement.querySelector('.card-text.overview');
  const editButtonGroup = cardElement.querySelector('.btn-group');

  if (overviewElement.style.display === 'none') {
    overviewElement.style.display = 'block';
    editButtonGroup.style.display = 'flex'; 
  } else {
    overviewElement.style.display = 'none';
    editButtonGroup.style.display = 'none';
  }
}

function addToList(cardId) {
  // Buraya eklenecek işlemler
  console.log('Added to List:', cardId);
}

window.onload = renderMovieCards;