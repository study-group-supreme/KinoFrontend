function renderAdminCreateMovie() {
    document.getElementById("app").innerHTML = `
        <h1>New movie</h1>

        <form id="new-movie-form">
            <p><label>Title <input id="movie-name" required></label></p>
            <p><label>Description <textarea id="movie-description" required></textarea></label></p>
            <p><label>Minutes <input id="movie-runtime" type="number" min="1" required></label></p>
            <p><label>Age limit
                <select id="movie-age">
                    <option value="0">All ages</option>
                    <option value="7">7</option>
                    <option value="11">11</option>
                    <option value="15">15</option>
                </select>
            </label></p>
            <p><label>Poster URL <input id="movie-poster" type="url"></label></p>
            <button type="submit">Save movie</button>
        </form>

        <p id="form-message"></p>
            <button id="back-btn">Back</button>
    `;



    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "adminHomePage";
    });

    document.getElementById("new-movie-form").addEventListener("submit", saveMovie);{
    }


}
async function saveMovie(event) {
    event.preventDefault();   // stop the browser from reloading the page

    // 1. Read the form into an object, named exactly like the fields in Movie.java
    const movie = {
        name: document.getElementById("movie-name").value,
        description: document.getElementById("movie-description").value,
        runtimeMinutes: Number(document.getElementById("movie-runtime").value),
        ageLimit: Number(document.getElementById("movie-age").value),
        posterUrl: document.getElementById("movie-poster").value,
        active: true
    };

    // 2. Send it to the backend as JSON
    const response = await fetch(`${state.apiBaseUrl}/api/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    });

    // 3. Success: go back to the list. Error: tell the user.
    if (response.ok) {
        location.hash = "home";
    } else {
        document.getElementById("form-message").textContent =
            "Could not save the movie. Did you fill in title, description and minutes?";
    }
}