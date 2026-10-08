async function renderAdminHomePage() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;

    document.getElementById("app").innerHTML = `
        <div id="error-box"></div>
        <h1>All Movies</h1>
        <button id="create-movie-btn">Create new movie</button>
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

            renderAdminHomePage();
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
            <td>${movie.active ? "Yes" : "No"}</td>
               
            <td>
                <button id="edit-button" data-action="edit" data-id="${movie.id}">Edit</button>
                <button data-action="delete" data-id="${movie.id}">Delete</button>
            </td>
        </tr>
    `;
}


