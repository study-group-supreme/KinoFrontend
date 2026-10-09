async function renderAdminShowingPage() {
    state.showings = await apiGet(`${state.apiBaseUrl}/api/showing` || []);
    const movieNames = [...new Set(state.showings.map(s => s.movieName))];

    document.getElementById("app").innerHTML = `
    <h1> All Showings </h1>
    <button id="back-btn"> back to home/movies </button>
    <button id="create-showing-btn">Create new showing</button>
    
    <label>Show
        <select id="time-filter">
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
        <option value="all">All</option>
    </select>  
    </label>
    
    <label> Movie
        <select id="movie-filter">
        
        <option value="">All movies</option>
        ${movieNames.map(name => `<option value="${name}">${name}</option>`).join("")}
    </select>
    </label>
    
    
    <p id="showing-count"></p>
    
    
    
    
        <table id="movie-table" class="admin-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Movie</th>
                    <th>Theater</th>
                    <th>Start Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="showing-rows"></tbody>
        </table>
    `;

    document.getElementById("time-filter").addEventListener("change", applyShowingFilters);
    document.getElementById("movie-filter").addEventListener("change", applyShowingFilters);
    document.getElementById("create-showing-btn").addEventListener("click",() => {
        location.hash = "admin_createShowing"
    })
    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "admin_home";
    });

    applyShowingFilters();
}


function adminShowingRow(showing) {
    const isPast = new Date(showing.startTime) < new Date();
    return `
    <tr class="${isPast ? "past" : ""}">
        <td>${showing.id}</td>
        <td class="movie-cell" title="${showing.movieName}">${showing.movieName}</td>
        <td>${showing.theatreName}</td>
        <td>${showing.startTime.replace("T", " ")}</td>
        <td>${isPast ? "Past" : "Upcoming"}</td>
    </tr>
`;
}

function applyShowingFilters(){
    const time = document.getElementById("time-filter").value;
    const  movie = document.getElementById("movie-filter").value;
    const now = new Date();

    const filtered = state.showings.filter(showing => {
        const isPast = new Date(showing.startTime) < now;
        if (time === "past" && !isPast) return false;
        if (time === "upcoming" && isPast) return false;
        if (movie && showing.movieName !== movie) return false;
        return true;
    });
    document.getElementById("showing-count").textContent =
        `Showing ${filtered.length} of ${state.showings.length}`;

    document.getElementById("showing-rows").innerHTML = filtered.length ? filtered.map(adminShowingRow).join("") :
        `<tr><td colspan="5">No showings match</td></tr>`;
}