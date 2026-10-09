async function renderEditShowingForm() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies/available`);
    const theatres = await apiGet(`${state.apiBaseUrl}/api/theatre/showAll`);
    const showing = await apiGet(`${state.apiBaseUrl}/api/showing/${state.selectedShowingId}`);
    if (!showing) {
        location.hash = "home"
        return;
    }
    document.getElementById("app").innerHTML = `
    <h1>Edit Showing Form</h1>
    <form id="edit-showing-form" class="form">
        <p><label><input type="hidden" id="showing-id"></label></p>
        <select id="ddMovies">
                <option value="">Select Movie</option>
                    ${movies.map(movies => `
                <option value="${movies.id}">
                    ${movies.name}
                </option>
                    `).join("")}
        </select>
             
        <select id="ddTheatre">
                <option value="">Select Theatre</option>
                    ${theatres.map(theatres => `
                <option value="${theatres.id}">
                    ${theatres.name}
                </option>
            `).join("")}
        </select>
        <p><label>Start Time <input id="showing-start-time" type="datetime-local" required></label></p>
        <button type="submit">Update showing</button>
    </form>
    <p id="form-message"></p>
            <button id="back-btn">Back</button>
    `;

    document.getElementById("showing-id").value = showing.id;
    document.getElementById("ddMovies").value = showing.movieId;
    document.getElementById("ddTheatre").value = showing.theatreId;
    document.getElementById("showing-start-time").value = showing.startTime;

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "admin_showing";
    });

    document.getElementById("edit-showing-form").addEventListener("submit", updateShowing)
}

async function updateShowing(event) {
    event.preventDefault();

    const updatedShowing = {
        movie: {id: Number(document.getElementById("ddMovies").value)},
        theatre: {id: Number(document.getElementById("ddTheatre").value)},
        startTime: document.getElementById("showing-start-time").value
    };

    try {
        await apiPut(`${state.apiBaseUrl}/api/showing/${state.selectedShowingId}`, updatedShowing);
        location.hash = "admin_showing"
    } catch (error) {
        document.getElementById("form-message").textContent = error.message;
    }
}