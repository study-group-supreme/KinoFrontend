async function renderAdminCreateShowing() {
    const movies = await apiGet(`${state.apiBaseUrl}/api/movies/available`);
    const theatres = await apiGet(`${state.apiBaseUrl}/api/theatre/showAll`);
    state.movies = movies;
    state.theatres = theatres;

    document.getElementById("app").innerHTML = `
        <h1>New Showing</h1>

        <form id="new-showing-form">
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
             <p><label>Start Time <input id="showing-startTime" type="datetime-local" required></label></p>
                 <button type="submit">Save showing</button>
        </form>

        <p id="form-message"></p>
            <button id="back-btn">Back</button>
    `;


    document.getElementById("ddMovies").addEventListener("change", async (e) => {
        const movie = e.target.value;
        return movie;

    });

    document.getElementById("ddTheatre").addEventListener("change",(e) => {
        const theatre = e.target.value;
        return theatre;
    })



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
        movie : {
            id  : document.getElementById("ddMovies").value
        },

        theatre : {
            id: document.getElementById("ddTheatre").value
        },

        startTime: (document.getElementById("showing-startTime").value),
    };

    // 2. Send it to the backend as JSON
    const response = await fetch(`${state.apiBaseUrl}/api/showing`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(showing)
    });

    // 3. Success: go back to the list. Error: tell the user.
    if (response.ok) {
        location.hash = "admin_home";
    } else {
        document.getElementById("form-message").textContent =
            "Could not save the showing. Did you fill in all required forms?";
    }
}