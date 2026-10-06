async function renderReservation() {
    if (!state.selectedShowingId) {
        location.hash = "home";
        return;
    }

    const seats = await apiGet(
        `${state.apiBaseUrl}/api/seat/showing/${state.selectedShowingId}`
    ) || [];

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

    document.getElementById("reserve-btn").addEventListener("click", submitReservation);

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "movie";
    });
}

function seatItem(seat) {
    return `
        <button onclick="selectSeat(${seat.id})" ${seat.taken ? "disabled" : ""}>
            ${seat.row}${seat.number}
        </button>
    `;
}

function selectSeat(id) {
    state.selectedSeatId = id;
}

async function submitReservation() {
    const message = document.getElementById("message");

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
}
