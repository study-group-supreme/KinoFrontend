//RenderPage
async function renderReservation() {
    if (!state.selectedShowingId) {
        location.hash = "home";
        return;
    }
//Hente sæder
    const seats = await apiGet(
        `${state.apiBaseUrl}/api/seat/showing/${state.selectedShowingId}`
    ) || [];
//Lave html
    document.getElementById("app").innerHTML = `
        <h1>Reserve ticket</h1>

        <input id="customerName" placeholder="Name"><br>
        <input id="customerPhone" placeholder="Phone"><br>
        <input id="customerMail" placeholder="Email"><br>

        <h2>Choose seat</h2>

        <div id="seat-list">
            ${seats.map(seatItem).join("")}
        </div>

        <button id="reserve-btn">Reserve</button>
        <button id="back-btn">Back</button>

        <p id="message"></p>
    `;
//Lytter til submit knap
    document.getElementById("reserve-btn").addEventListener("click", submitReservation);
//Lytter til back knap
    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "movie";
    });
}

//Vælge sæde, når man klikker på sæde gemmer selectSeat sæde it i staten.
function seatItem(seat) {
    let color = !seat.taken ? "available" : "reserved";
    let btn = `
        <button class="${color}" onclick="selectSeat(${seat.id})" ${seat.taken ? "disabled" : ""}>
            ${seat.row}${seat.number}
        </button>`
    return btn;
}

//Gemmer sæde id i staten
function selectSeat(id) {
    state.selectedSeatId = id;
}

//Tryk på reserver bliver den her kaldt
async function submitReservation() {
    const message = document.getElementById("message");
//Hvis der ikke har været et sæde gemt i state, skriv besked til bruger
    if (!state.selectedSeatId) {
        message.textContent = "Choose a seat.";
        return;
    }

    const reservation = {
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        customerMail: document.getElementById("customerMail").value
    };

    const result = await apiPost(
        `${state.apiBaseUrl}/api/reservation/${state.selectedShowingId}/${state.selectedSeatId}`,
        reservation
    );

    if (!result) {
        message.textContent = "Could not reserve ticket.";
        return;
    }

    message.textContent = "Ticket reserved!";
    state.selectedSeatId = null;
    await renderReservation();
}
