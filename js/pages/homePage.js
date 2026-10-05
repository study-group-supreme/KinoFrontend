async function renderHome() {
    let movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies; // gem globalt

    let movieHtml = movies.map(movie => `
        <button onclick="selectMovie(${movie.id})">
            ${movie.name}
        </button>
    `).join("<br>");

    document.getElementById("app").innerHTML = `
        <h1>Movies</h1>
        <p></p>
               
${movieHtml}
    `;


}

function selectMovie(id) {
    state.selectedMovieId = id;
    location.hash = "movie";
}