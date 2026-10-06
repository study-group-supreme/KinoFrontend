async function renderHome() {
    let movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies; // gem globalt

    let movieHtml = movies.map(movie => `
        <button onclick="selectMovie(${movie.id})">
            ${movie.name}
        </button>
    `).join("<br>");

    document.getElementById("app").innerHTML = `
        <a href="#showings">See all showings</a>
        <a href="#new-movie">New movie</a>
        <h1>Film i biografen</h1>
        ${movieHtml}
    `;
}

function selectMovie(id) {
    state.selectedMovieId = id;
    location.hash = "movie";
}