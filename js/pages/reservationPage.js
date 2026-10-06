async function renderReservation() {
    if (!state.selectedShowingId) {
        location.hash = "home";
        return;
    }

    state.selectedSeatId = null;

    document.getElementById("app").innerHTML = `
        <h1>Reserve ticket</h1>
        <input id="customerName" placeholder="Name"><br>
        <input id="customerPhone" placeholder="Phone"><br>
        <input id="customerMail" placeholder="Email"><br>

        <h2>Choose seat</h2>
        <div id="seat-list" class="seat-list"></div>

        <button onclick="submitReservation()">Reserve</button>
        <button onclick="location.hash='movie'">Back</button>
        <p id="message"></p>
    `;

    document.getElementById("seat-list").addEventListener("click", (e) => {
        const button = e.target.closest("button[data-id]");
        if (!button) return;

        state.selectedSeatId = Number(button.dataset.id);

        document.querySelectorAll("#seat-list button")
            .forEach(b => b.classList.remove("selected"));
        button.classList.add("selected");
    });

    await loadSeats();
}

async function loadSeats() {
    const seats = await apiGet(
        `${state.apiBaseUrl}/api/seat/showing/${state.selectedShowingId}`
    ) || [];

    document.getElementById("seat-list").innerHTML = seats.map(seatItem).join("");
}

function seatItem(seat) {
    const selected = seat.id === state.selectedSeatId ? "selected" : "";
    return `
        <button data-id="${seat.id}" class="${selected}" ${seat.taken ? "disabled" : ""}>
            ${seat.row}${seat.number}
        </button>
    `;
}

async function submitReservation() {
    const message = document.getElementById("message");

    if (state.selectedSeatId === null) {
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
    await loadSeats();
}