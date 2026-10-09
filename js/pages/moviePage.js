async function renderMovie() {
    const movie = state.movies.find(m => m.id === state.selectedMovieId);

    if (!movie) {
        location.hash = "home";
        return;
    }

    const groups = await apiGet(`${state.apiBaseUrl}/api/showing/movie/${state.selectedMovieId}/grouped`) || [];

    const groupedHtml = groups.map(group => `
        <section class="showing-date-group">
            <h3>${group.date}</h3>
            <ul class="showing-date-list">
                ${group.showings.map(s => `
                    <li class="showing-item" data-id="${s.id}">
                        ${s.startTime.split("T")[1].slice(0,5)}
                    </li>
                `).join("")}
            </ul>
        </section>
    `).join("");

    document.getElementById("app").innerHTML = `
        <article class="movie-details">
            <button id="back-btn">Back</button>

            <header>
                <h1 class="movie-name-head">${movie.name}</h1>
            </header>

            <section class="movie-info">
                <img src="${movie.posterUrl}" alt="Poster coming soon" class="movie-poster">

                <p>${movie.description || "No description available."}</p>
                <p><strong>Runtime:</strong> ${movie.runtimeMinutes} min</p>
                <p><strong>Age limit:</strong> ${movie.ageLimit}</p>
                <p><strong>Genre(s):</strong> ${movie.categories.map(c => c.name).join(", ")}</p>
            </section>

            <section class="showings" id="showings-container">
                <h2>Showtimes</h2>
                ${groupedHtml}
            </section>
        </article>
    `;

    document.getElementById("showings-container").addEventListener("click", (e) => {
        const li = e.target.closest("li[data-id]");
        if (!li) return;
        selectShowing(Number(li.dataset.id));
    });

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "home";
    });
}

function selectShowing(id) {
    state.selectedShowingId = id;
    location.hash = "reservation";
}