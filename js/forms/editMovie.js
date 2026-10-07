async function renderEditMovieForm() {
    const movie = await apiGet(`${state.apiBaseUrl}/api/movies/${state.selectedMovieId}`)
    if(!movie){
        location.hash = "home";
        return;
    }
    document.getElementById("app").innerHTML = `
    <h1>Edit Movie Form</h1>
    <form id="edit-movie-form" class="form">
        <p hidden><label><input type="hidden" id="movie-id"></label></p>
        <p><label>Title: <input required id="movie-name"></label></p>
        <p><label>Description: <textarea id="movie-description" required></textarea></label></p>
        <p><label>Duration in minutes: <input id="movie-runtime" type="number" min="1" required></label></p>
        <p><label>Age limit: <input id="movie-age" type="number" min="0"></label></p>
        <p><label>Poster url: <input id="movie-poster" type="url"></label></p>
        <p><label>Activity status: 
                <select id="movie-activity">
                    <option value="true">Airing</option>
                    <option value="false">Not Airing</option>       
                </select>
        </label></p>
        <button type="submit">Update details</button>
    </form>
    <p id="form-message"></p>
    <button id="back-btn">Back</button>
    `;

    document.getElementById("movie-id").value = movie.id;
    document.getElementById("movie-name").value = movie.name;
    document.getElementById("movie-description").value = movie.description;
    document.getElementById("movie-runtime").value = movie.runtimeMinutes;
    document.getElementById("movie-age").value = movie.ageLimit;
    document.getElementById("movie-poster").value = movie.posterUrl;
    document.getElementById("movie-activity").value = String(movie.active);

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "home";
    });

    document.getElementById("edit-movie-form").addEventListener("submit", updateMovie)
}

async function updateMovie(event){
    event.preventDefault();

    const updatedMovie = {
        name: document.getElementById("movie-name").value,
        description: document.getElementById("movie-description").value,
        runtimeMinutes: document.getElementById("movie-runtime").value,
        ageLimit: document.getElementById("movie-age").value,
        posterUrl: document.getElementById("movie-poster").value,
        active: document.getElementById("movie-activity").value === "true"
    };

    const result = await apiPut(`${state.apiBaseUrl}/api/movies/${state.selectedMovieId}`, updatedMovie);

    if (result){
        location.hash = "home";
    } else {
        document.getElementById("form-message").textContent = "Could not update movie";
    }
}