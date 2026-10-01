function renderMovie() {
    let movieId = state.selectedMovieId;

    // find filmen i state
    let movie = state.movies.find(m => m.id === movieId);

    document.getElementById("app").innerHTML = `
        <h1>${movie.name}</h1>
        <p>${movie.description || "Ingen beskrivelse"}</p>

        <button onclick="location.hash='home'">Tilbage</button>
    `;
}