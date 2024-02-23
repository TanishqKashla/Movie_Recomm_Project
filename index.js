document.getElementById('genre-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const selectedGenreId = document.getElementById('genres').value;
    const selectedReleaseYear = document.getElementById('release-year').value;

    fetchMoviesByGenreAndYear(selectedGenreId, selectedReleaseYear);
});

function fetchMoviesByGenreAndYear(genreId, releaseYear) {
    const apiKey = 'bf63ca3e71b0f58f46a1b78516dab0f3'; // Replace with your actual TMDb API key

    if (releaseYear === 'before-2000') {
        // If "Before 2000" is selected, fetch movies released before the year 2000
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}&primary_release_date.lte=1999-12-31`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching movies:', error));
    } else {
        // For other year ranges, extract lower and upper years and fetch accordingly
        const lowerYear = parseInt(releaseYear.split('-')[0]);
        const upperYear = parseInt(releaseYear.split('-')[1]);

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}&primary_release_date.gte=${lowerYear}-01-01&primary_release_date.lte=${upperYear}-12-31`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }
}


function displayMovies(movies) {
    const movieListContainer = document.getElementById('movie-list');
    movieListContainer.innerHTML = ''; // Clear previous movie list

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        // Display movie poster
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w154/${movie.poster_path}`;
        moviePoster.alt = movie.title;

        // Display movie title with release year
        const movieTitle = document.createElement('div');
        movieTitle.textContent = `${movie.title} (${getReleaseYear(movie.release_date)})`;

        // Display "Show Details" button
        const movieDropdown = document.createElement('button');
        movieDropdown.textContent = 'Show Details';
        movieDropdown.classList.add('show-details-button'); // Add a class for styling if needed
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

        // Append elements to movie item
        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieTitle); // Add movie title with release year
        movieItem.appendChild(movieDropdown);
        movieListContainer.appendChild(movieItem);
    });
}

// Helper function to get the release year from the full release date
function getReleaseYear(releaseDate) {
    if (releaseDate) {
        return new Date(releaseDate).getFullYear();
    }
    return 'N/A';
}

