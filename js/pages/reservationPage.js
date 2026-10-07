// RenderPage
async function renderReservation() {
    if (!state.selectedShowingId) {
        location.hash = "home";
        return;
    }

    // Hente sæder
    const seats = await apiGet(
        `${state.apiBaseUrl}/api/seat/showing/${state.selectedShowingId}`
    ) || [];

    // Lave html
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

    // Lytter til submit knap
    document.getElementById("reserve-btn").addEventListener("click", submitReservation);

    // Lytter til back knap
    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "movie";
    });
}

// Et afkrydsningsfelt pr. sæde. Optagede sæder er disabled
function seatItem(seat) {
    return `
        <label class="seat">
            <input type="checkbox" value="${seat.id}" ${seat.taken ? "disabled" : ""}>
            <span>${seat.row}${seat.number}</span>
        </label>
    `;
}

async function submitReservation() {
    const message = document.getElementById("message");

    // Find de afkrydsede sæder. Hvis der ingen er, skriv besked til bruger
    const checked = document.querySelectorAll("#seat-list input:checked");
    if (checked.length === 0) {
        message.textContent = "Choose a seat.";
        return;
    }

    // Saml sæde-id'erne til en tekst som "1,2,3"
    let seatIds = "";
    for (const checkbox of checked) {
        if (seatIds !== "") {
            seatIds += ",";
        }
        seatIds += checkbox.value;
    }

    const reservation = {
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        customerMail: document.getElementById("customerMail").value
    };

    // Send reservation med post metode
    const result = await apiPost(
        `${state.apiBaseUrl}/api/reservation/${state.selectedShowingId}?seatIds=${seatIds}`,
        reservation
    );

    if (!result) {
        message.textContent = "Could not reserve ticket.";
        return;
    }

    await renderReservation();
    document.getElementById("message").textContent = "Ticket reserved!";
}