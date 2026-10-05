async function renderMovie()  {
    let movieId = state.selectedMovieId;
    let showing = await apiGet(`${state.apiBaseUrl}/api/showings/${movieId}`);

    let showingHtml = showing.map(movie => `
        <button onclick="selectShowing(${showing.id})">
            ${showing.startTime}
        </button>
    `).join("<br>");

    document.getElementById("app").innerHTML = `
        <h1>${movie.name}</h1>
         <p>${movie.description || "Ingen beskrivelse"}</p>
        <p>Runtime: ${movie.runTimeMinutes} min</p>
        
    `;
    // find filmen i state
    let movie = state.movies.find(m => m.id === movieId);

    document.getElementById("app").innerHTML = `
        <h1>${movie.name}</h1>
        <p>${movie.description || "Ingen beskrivelse"}</p>

        <button onclick="location.hash='home'">Tilbage</button>
    `;
}