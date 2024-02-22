
//bf63ca3e71b0f58f46a1b78516dab0f3
// Add your JavaScript code here

// Add your JavaScript code here

document.getElementById('genre-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const selectedGenreId = document.getElementById('genres').value;
    fetchMoviesByGenre(selectedGenreId);
});

function fetchMoviesByGenre(genreId) {
    const apiKey = 'bf63ca3e71b0f58f46a1b78516dab0f3'; // Replace with your actual TMDb API key
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    const movieListContainer = document.getElementById('movie-list');
    movieListContainer.innerHTML = ''; // Clear previous movie list

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const movieTitle = document.createElement('div');
        movieTitle.textContent = `Movie Title: ${movie.title}`;

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w154/${movie.poster_path}`;
        moviePoster.alt = movie.title;

        const movieDropdown = document.createElement('button');
        movieDropdown.textContent = 'Show Details';
        movieDropdown.addEventListener('click', function() {
            // Open modal popup window
            const modal = document.getElementById('myModal');
            const overviewElement = document.getElementById('overview');
            const ratingElement = document.getElementById('rating');

            overviewElement.textContent = `Overview: ${movie.overview}`;
            ratingElement.textContent = `Rating: ${movie.vote_average}`;

            modal.style.display = 'block';

            // Close the modal when the close button is clicked
            const closeBtn = document.getElementsByClassName('close')[0];
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };

            // Close the modal when clicking outside of it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        });

        movieItem.appendChild(movieTitle);
        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieDropdown);
        movieListContainer.appendChild(movieItem);
    });
}
