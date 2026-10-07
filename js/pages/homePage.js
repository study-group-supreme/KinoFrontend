async function renderHome() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies/available`);
    const categories = await apiGet(`${state.apiBaseUrl}/api/movies/categories`);
    state.movies = movies;
    state.categories = categories;

    document.getElementById("app").innerHTML = `
        <h1>Movies</h1>
        <select id="ddCategories">
            <option value="">All categories</option>
            ${categories.map(category => `
                <option value="${category.name}">
                    ${category.name}
                </option>
            `).join("")}
        </select>
        
        <section id="movie-list" class="movie-list">
            ${movies.map(movieCard).join("")}
        </section>
    `;

    document.getElementById("movie-list").addEventListener("click", (e) => {
        const card = e.target.closest(".movie-card");
        if (!card) return;
        selectMovie(Number(card.dataset.id));
    });

    document.getElementById("ddCategories").addEventListener("change", async (e) => {
        const category = e.target.value;

        if (!category) {
            document.getElementById("movie-list").innerHTML =
                state.movies.map(movieCard).join("");
            return;
        }

        const filteredMovies = await apiGet(
            `${state.apiBaseUrl}/api/movies/categories/${category}`
        );

        document.getElementById("movie-list").innerHTML =
            filteredMovies.map(movieCard).join("");
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