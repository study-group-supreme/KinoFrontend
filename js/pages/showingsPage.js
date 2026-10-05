async function renderShowings(){
    const app = document.getElementById("app")

    const showings = await apiGet(`${state.apiBaseUrl}/api/showing`)

    if(!showings){
        app.innerHTML = "<p>Could not load showings</p>"
    }

    state.showings = showings;

    app.innerHTML = "<h1>Showings</h1>"
    app.appendChild(createShowingsTable(showings));
}

function createShowingsTable(showings){
    const table = document.createElement("table");

    const  headerRow = table.insertRow();
    for (const text of ["Id", "Movie", "Start Time", "Theatre", ""]){
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th)
    }
    for (const showing of showings){
        const row = table.insertRow();

        row.insertCell().textContent = showing.id;
        row.insertCell().textContent = showing.movieName;
        row.insertCell().textContent = showing.startTime.replace("T", " ");
        row.insertCell().textContent = showing.theatreName;
        row.insertCell().innerHTML = `<a href="#showing/${showing.id}">Book</a>`
    }

    return table;
}