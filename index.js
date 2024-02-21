window.onload = function() {
    const genresList = document.getElementById('genres-list');

    // Fetch genres from TMDb API
    fetchGenres();

    function fetchGenres() {
        const apiKey = 'bf63ca3e71b0f58f46a1b78516dab0f3';
        fetch(https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US)
            .then(response => response.json())
            .then(data => {
                // Generate list of genres
                const genres = data.genres.map(genre => <div class="genre" data-id="${genre.id}">${genre.name}</div>).join('');
                genresList.innerHTML = genres;

                // Add event listener to each genre
                const genreElements = document.querySelectorAll('.genre');
                genreElements.forEach(genreElement => {
                    genreElement.addEventListener('click', () => {
                        const genreId = genreElement.getAttribute('data-id');
                        // Perform further actions based on selected genre (e.g., fetch movies of that genre)
                        console.log('Selected genre ID:', genreId);
                    });
                });
            })
            .catch(error => console.error('Error fetching genres:', error));
    }
};