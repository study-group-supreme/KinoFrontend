async function renderAdminShowingPage() {
    const showings = await apiGet(`${state.apiBaseUrl}/api/showing` || []);

    document.getElementById("app").innerHTML = `
    <h1> All Showings </h1>
    <button id="back-btn"> back to home </button>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Movie</th>
                    <th>Theater</th>
                    <th>Start Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>${showings.map(adminShowingRow).join("")}</tbody>
        </table>
    `;
    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "admin_home";
    });
}

function adminShowingRow(showing) {
    const isPast = new Date(showing.startTime) < new Date();
    return `
    <tr class="${isPast ? "past" : ""}">
        <td>${showing.id}</td>
        <td>${showing.movieName}</td>
        <td>${showing.theatreName}</td>
        <td>${showing.startTime.replace("T", " ")}</td>
        <td>${isPast ? "Past" : "Upcoming"}</td>
    </tr>
`;
}