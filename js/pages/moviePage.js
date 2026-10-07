async function renderMovie() {
    const movie = state.movies.find(m => m.id === state.selectedMovieId);

    if (!movie) {
        location.hash = "home";
        return;
    }

    const showings = await apiGet(`${state.apiBaseUrl}/api/showing/movie/${state.selectedMovieId}`) || [];

    document.getElementById("app").innerHTML = `
        <article class="movie-details">
                    <button id="back-btn">Back</button>
            <header>
                <h1>${movie.name}</h1>
            </header>

            <section class="movie-info">
                <img src="${movie.posterUrl}" alt="Poster coming soon" class="movie-poster">

                <p>${movie.description || "No description available."}</p>
                <p><strong>Runtime:</strong> ${movie.runtimeMinutes} min</p>
                <p><strong>Age limit:</strong> ${movie.ageLimit}</p>
            </section>
            

            <section class="showings">
                <h2>Showtimes</h2>
                <ul id="showing-list">
                    ${showings.map(showingItem).join("")}
                </ul>
            </section>


        </article>
    `;

    document.getElementById("showing-list").addEventListener("click", (e) => {
        const li = e.target.closest("li[data-id]");
        if (!li) return;
        selectShowing(Number(li.dataset.id));
    });


    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "home";
    });
}

function showingItem(showing) {
    return `
        <li class="showing-item" data-id="${showing.id}">
            <p>
                ${showing.startTime.replace("T", " ")}
            </p>
        </li>
    `;
}

function selectShowing(id) {
    state.selectedShowingId = id;
    location.hash = "reservation";
}