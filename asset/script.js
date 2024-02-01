document.addEventListener('DOMContentLoaded', function() {
    const addMovieButton = document.getElementById('add-movie-show');
    const movieAdditionSection = document.getElementById('movie-addition-section');
    const movieList = document.getElementById('movie-list');
  
    const topMoviesSection = document.getElementById('top-movies-section');
    const topMoviesRow = document.getElementById('top-movies');
  
    const topSeriesSection = document.getElementById('top-series-section');
    const topSeriesRow = document.getElementById('top-series');
  
    addMovieButton.addEventListener('click', function() {
      movieAdditionSection.style.display = 'block';
    });
  
    const addMovieForm = document.getElementById('movie-addition-form');
  
    addMovieForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const movieName = document.getElementById('movie-name').value;
      const movieRating = document.getElementById('movie-rating').value;
      const movieGenre = document.getElementById('movie-genre').value;
      const movieImage = document.getElementById('movie-image').value;
  
      // Movie addition logic here
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="card mb-3">
          <img src="${movieImage}" class="card-img-top" alt="${movieName}">
          <div class="card-body">
            <h5 class="card-title">${movieName}</h5>
            <p class="card-text">Rating: ${movieRating} | Genre: ${movieGenre}</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="showDetails('${movieName}')">Details</button>
          </div>
        </div>
      `;
  
      movieList.appendChild(listItem);
      movieAdditionSection.style.display = 'none';
      addMovieForm.reset();
    });
  
    // Assume you have functions to fetch top movies and series from an API
    function fetchTopMovies() {
      // Replace this with your actual API call for top movies
      return [
        { name: 'Movie 1', rating: 8.5, genre: 'Action', image: 'url1' },
        { name: 'Movie 2', rating: 9.0, genre: 'Drama', image: 'url2' },
        // Add more movies as needed
      ];
    }
  
    function fetchTopSeries() {
      // Replace this with your actual API call for top series
      return [
        { name: 'Series 1', rating: 8.7, genre: 'Sci-Fi', image: 'url3' },
        { name: 'Series 2', rating: 9.2, genre: 'Mystery', image: 'url4' },
        // Add more series as needed
      ];
    }
  
    // Function to create a card element for movies or series
    function createCard(item, section, isTop) {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');
  
      card.innerHTML = `
        <div class="card">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Rating: ${item.rating.toFixed(1)} | Genre: ${item.genre}</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="showDetails('${item.name}', ${isTop})">Details</button>
          </div>
        </div>
      `;
  
      section.appendChild(card);
    }
  
    // Function to render top movies
    function renderTopMovies() {
      const topMovies = fetchTopMovies();
      topMovies.forEach(movie => createCard(movie, topMoviesRow, true));
    }
  
    // Function to render top series
    function renderTopSeries() {
      const topSeries = fetchTopSeries();
      topSeries.forEach(series => createCard(series, topSeriesRow, true));
    }
  
    // Function to render movies from the list
    function renderMovieList() {
      // Replace this with your logic to fetch movies from the list
      const movieListData = [
        { name: 'List Movie 1', rating: 7.5, genre: 'Comedy', image: 'url5' },
        { name: 'List Movie 2', rating: 8.0, genre: 'Adventure', image: 'url6' },
        // Add more movies from the list as needed
      ];
  
      movieListData.forEach(movie => createCard(movie, movieList, false));
    }
  
    // Call functions to render top movies, series, and movie list
    renderTopMovies();
    renderTopSeries();
    renderMovieList();
  });
  
  // Function to show details (this can be extended based on your needs)
  function showDetails(name, isTop) {
    // Replace this with your logic to show details
    alert(`Showing details) for ${name} (isTop: ${isTop})`);
    }