const movieContainer = document.getElementById('modal-body')
const searchMoviesBtn = document.getElementById('searchBtn')
const searchResultsModal = document.getElementById('searchResultsModal')

const watchLibraryContainer = document.getElementById('displayContainer')
const watchLibraryBtn = document.getElementById('watch-library-button')
const watchLibraryheading = document.getElementById('w-l-heading')
const watchLibrarySlogan = document.getElementById('w-l-info')
const saveChangesBtn = document.getElementById('save-changes-btn')

const defaultImageURL = './assets/media/defaultmovieimage.jpg'
// Retrieve saved movies from local storage
var savedmovies = JSON.parse(localStorage.getItem('savedmovies')) || []
var searchValue = document.getElementById('searchValue')

// fetching results, opening a modal, displaying the results
searchMoviesBtn.addEventListener('click', function(e) {
  e.preventDefault()

  // Check if the searchValue is empty
  if (!searchValue.value.trim()) {
    alert('Please enter a search value.')
    return
  }

  var queryString = `https://www.omdbapi.com/?s=${searchValue.value}&i=tt3896198&apikey=9a161259&plot=full&r=json`
  fetch(queryString)
    .then((res) => res.json())
    .then((data) => {
      let results = data.Search
      movieContainer.innerHTML = ''

      results.forEach((item) => {
        console.log(item)
        let movieDiv = document.createElement('div')
        movieDiv.innerHTML = `
          <div class='card d-flex justify-content-center align-items-center'>
            ${item.Title}
            <img class='img-formatting' src='${item.Poster !== 'N/A' ? item.Poster : defaultImageURL}' alt='${item.Title}'>
            <p>Plot: ${item.Plot}</p>
            <p>Ratings:</p>

            <button id='${item.imdbID}' class='btn fa-large fa-bookmark' type='submit' value='${item.imdbID}'>

            </button>
          </div>
        `
        movieContainer.append(movieDiv)

        let bookmarkBtn = document.getElementById(`${item.imdbID}`)
        bookmarkBtn.addEventListener('click', function(e) {
          e.preventDefault()
          if (e.target.value === item.imdbID) {
            // Save the movie to local storage
            savedmovies.push(item)
            savedmovies = checkDuplicates(savedmovies)
            localStorage.setItem('savedmovies', JSON.stringify(savedmovies))
            renderSavedMovie()
          }
        })
      })
    })
    .catch((err) => console.log(err))
})

watchLibraryBtn.addEventListener('click', function() {
  showWatchLibrary()
  renderSavedMovie()
})

saveChangesBtn.addEventListener('click', function() {
  var modal = bootstrap.Modal.getInstance(searchResultsModal) // Retrieve the modal instance
  modal.hide()
})

function renderSavedMovie() {
  // Clear existing content
  watchLibraryContainer.innerHTML = ''

  savedmovies.forEach(function(movie) {
    let savedmovieDiv = document.createElement('div')
    savedmovieDiv.className = 'card mb-3'
    savedmovieDiv.style.maxWidth = '300px'

    // Use the movie poster if available, otherwise use the default image
    const imageUrl = movie.Poster !== 'N/A' ? movie.Poster : defaultImageURL

    savedmovieDiv.innerHTML =
      `<img src='${imageUrl}' class='card-img-top' alt='${movie.Title}'>
      <div class='card-body'>
        <h5 class='card-title'>${movie.Title}</h5>
        <p class='card-text'>
          This is a wider card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <button class='btn btn-primary' onclick="removeMovie('${movie.imdbID}')">Remove</button>
      </div>`

    watchLibraryContainer.appendChild(savedmovieDiv)
  })  
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

function showWatchLibrary() {
  watchLibraryheading.classList.add('hide')
  watchLibrarySlogan.classList.add('hide')
  watchLibraryBtn.classList.add('hide')

}
