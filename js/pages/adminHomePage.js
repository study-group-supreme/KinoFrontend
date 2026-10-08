async function renderAdminHomePage() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;

    document.getElementById("app").innerHTML = `
        <div id="error-box"></div>

        <h1>All Movies</h1>
        <button id="create-movie-btn">Create new movie</button>
        <button id="all-showings-btn">See all showings</button>

        <table id="movie-table">
            <thead>
                <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Runtime Minutes</th>
                <th>Age Limit</th>
                <th>Is Active</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${movies.map(movieRow).join("")}
            </tbody>
        </table>
    `;

    document.getElementById("create-movie-btn").addEventListener("click", () => {
        location.hash = "admin_create";
    });

    document.getElementById("all-showings-btn").addEventListener("click", () => {
        location.hash = "admin_showing";
    });

    document.getElementById("movie-table").addEventListener("click", async (e) => {
        const button = e.target.closest("button");
        if (!button) return;
        const id = Number(button.dataset.id);

        if (button.dataset.action === "edit") {
            state.selectedMovieId = id;
            location.hash = "editMovie"
        }

        if (button.dataset.action === "delete") {
            const result = await apiDelete(`${state.apiBaseUrl}/api/movies/${id}`);

            if (result?.error) {
                document.getElementById("error-box").innerText = result.error;
                return;
            }

            await renderAdminHomePage();
        }

        if(button.dataset.action === "tickets"){
            state.selectedMovieId = id;
            location.hash = "movieShowings"
        }
    });
}

function movieRow(movie) {
    return `
        <tr>
            <td id="movie-id">${movie.id}</td>
            <td>${movie.name}</td>
            <td>${movie.runtimeMinutes}</td>
            <td>${movie.ageLimit}</td>
            <td>${movie.isActive ? "Yes" : "No"}</td>
               
            <td>
                <button id="edit-button" data-action="edit" data-id="${movie.id}">Edit</button>
                <button data-action="delete" data-id="${movie.id}">Delete</button>
                <button data-action="tickets" data-id="${movie.id}">All showings data</button>
            </td>
        </tr>
    `;
}

async function loadShowing(showingId) {
    const {movie, tickets} = await apiGet(`${state.apiBaseUrl}/api/ticket/${showingId}`);
    state.selectedShowing = {showingId, movie, tickets};
}

async function renderShowingsPage() {
    const movie = state.movies.find(m => m.id === state.selectedMovieId);
    const showings = await apiGet(`${state.apiBaseUrl}/api/showing/movie/${state.selectedMovieId}`);

    document.getElementById("app").innerHTML = `
        <h1>Showings for ${movie.name}</h1>
        <button id="back-btn">Back</button>
        <ul id="showing-list">
            ${showings.map(s => `
                <li>
                    <button data-showing-id="${s.id}">
                        ${new Date(s.startTime).toLocaleString()}
                    </button>
                </li>`).join("")}
        </ul>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "admin_home";
    });

    document.getElementById("showing-list").addEventListener("click", async (e) => {
        const button = e.target.closest("button");
        if (!button) return;
        await loadShowing(Number(button.dataset.showingId));
        location.hash = "showingTickets";
    });
}