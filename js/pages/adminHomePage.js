async function renderAdminHomePage() {

    const movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;

    document.getElementById("app").innerHTML = `
    <h1>All Movies<h1>
    <select id="movie-list" class="movie-table">
    ${movies.map(createMovieTable).join("")}
    </select>
    `;

    // document.getElementById("movie-list").addEventListener("click", (e) =>{
    //
    // })
}
    function createMovieTable(movies) {
        const table = document.createElement("table");

        const headerRow = table.insertRow();
        {
            for (const text of ["id", "name", "runTime", "ageLimit", "isActive", ""]) {
                const th = document.createElement("th");
                th.textContent = text;

                headerRow.appendChild(th)
            }
            for (const movie of movies) {
                const row = table.insertRow();

                row.insertCell().textContent = movie.id;
                row.insertCell().textContent = movie.movieName;
                row.insertCell().textContent = movie.startTime.replace("T", " ");
                row.insertCell().textContent = movie.theatreName;
                row.insertCell().innerHTML = `<a href="#movie/${movie.id}">Book</a>`
            }

            return table;
        }
    }


