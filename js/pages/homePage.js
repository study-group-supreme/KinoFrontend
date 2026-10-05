async function renderHome() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;

    document.getElementById("app").innerHTML = `
        <h1>Movies</h1>
        <section id="movie-list" class="movie-list">
            ${movies.map(movieCard).join("")}
        </section>
    `;

    document.getElementById("movie-list").addEventListener("click", (e) => {
        const card = e.target.closest(".movie-card");
        if (!card) return;
        selectMovie(Number(card.dataset.id));
    });
}

function movieCard(movie) {
    return `
        <article class="movie-card" data-id="${movie.id}">
                <img src="${movie.posterUrl}" alt="Poster coming soon">
                <h3>${movie.name}</h3>
        </article>
    `;
}

function selectMovie(id) {
    state.selectedMovieId = id;
    location.hash = "movie";
}