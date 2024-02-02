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



