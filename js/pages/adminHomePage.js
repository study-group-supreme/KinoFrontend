async function renderAdminHomePage() {
    const movies = await apiGet (`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;

    document.getElementById("app").innerHTML = `
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
                </tr>
                <th>Actions</th>
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

    document.getElementById("movie-table").addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) return;
        const id = Number(button.dataset.id);

        if (button.dataset.action === "edit")   {
            state.selectedMovieId = id;
            location.hash = "editMovie"
        }
        if (button.dataset.action === "delete") { }
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
                <button id="edit-button" data-action="edit"   data-id="${movie.id}">Edit</button>
                <button data-action="delete" data-id="${movie.id}">Delete</button>
            </td>
        </tr>
    `;
}


