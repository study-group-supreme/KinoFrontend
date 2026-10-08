function renderAdminCreateShowing() {
    document.getElementById("app").innerHTML = `
        <h1>New Showing</h1>

        <form id="new-showing-form">
            <p><label>Movie shown <input id="movie-name" required></label></p>
            <p><label>Theatre <textarea id="theatre-name" required></textarea></label></p>
            <p><label>Starte Time <input id="showing-startTime" type="number" min="1" required></label></p>
            <button type="submit">Save showing</button>
        </form>

        <p id="form-message"></p>
            <button id="back-btn">Back</button>
    `;



    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "admin_home";
    });

    document.getElementById("new-showing-form").addEventListener("submit", saveShowing);{
    }


}
async function saveShowing(event) {
    event.preventDefault();   // stop the browser from reloading the page

    // 1. Read the form into an object, named exactly like the fields in Movie.java
    const showing = {
        movieName: document.getElementById("movie-name").value,
        theatreName: document.getElementById("theatre-name").value,
        startTime: Number(document.getElementById("showing-startTime").value),
        status: Number(document.getElementById("showing-status").value),
    };

    // 2. Send it to the backend as JSON
    const response = await fetch(`${state.apiBaseUrl}/api/showing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(showing)
    });

    // 3. Success: go back to the list. Error: tell the user.
    if (response.ok) {
        location.hash = "home";
    } else {
        document.getElementById("form-message").textContent =
            "Could not save the movie. Did you fill in all required forms?";
    }
}