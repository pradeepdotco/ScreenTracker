// Main Search

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var searchInput = document.getElementById("search-input").value;
  addMovie(searchInput);
});

function addMovie(movie) {
  var movieList = document.getElementById("movie-list");
  var listItem = document.createElement("li");
  listItem.textContent = movie;
  listItem.classList.add("list-group-item");
  movieList.appendChild(listItem);
  saveMovie(movie);
}

function saveMovie(movie) {
  var movies;
  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }
  movies.push(movie);
  localStorage.setItem("movies", JSON.stringify(movies));
}

function getMovies() {
  var movies;
  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }
  var movieList = document.getElementById("movie-list");
  movies.forEach(function (movie) {
    var listItem = document.createElement("li");
    listItem.textContent = movie;
    listItem.classList.add("list-group-item");
    movieList.appendChild(listItem);
  });
}

getMovies();
