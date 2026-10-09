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

    const ticketTypes = await apiGet(
        `${state.apiBaseUrl}/api/ticketType`
    ) || [];

    const grouped = groupSeatsByRow(seats);

    // Lave html
    document.getElementById("app").innerHTML = `
<form
        <h1 class="header">Reserve ticket</h1>
        <br>
        <input required type="text" id="customerName" placeholder="Name"><br>
        <input required type="tel" id="customerPhone" placeholder="Phone"><br>
        <input required type="email" id="customerMail" placeholder="Email"><br>

<select id="ticketType">
${ticketTypes.map(ticketTypeItem).join("")}
</select>

        <h2>Choose seat</h2>
    <div class="screen">SCREEN</div>

    <div id="seat-rows">
        ${(() => {
        let html = "";

        for (const row in grouped) {
            const seatsInRow = grouped[row];

            html += `
            <div class="seat-row">
                <div class="row-seats">
                    ${seatsInRow.map(seatItem).join("")}
                </div>
            </div>
        `;
        }

        return html;
    })()}
    </div>

        <button id="reserve-btn">Reserve</button>
        <button id="back-btn">Back</button>

        <p id="message"></p>
        <form/>
    `;

    // Lytter til submit knap
    document.getElementById("reserve-btn").addEventListener("click", submitReservation);

    // Lytter til back knap
    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "movie";
    });
}

function groupSeatsByRow(seats) {
    const rows = {};

    for (const seat of seats) {
        if (!rows[seat.row]) {
            rows[seat.row] = [];
        }
        rows[seat.row].push(seat);
    }

    return rows;
}

//Sæde checkbox = checked. Sætter den til grøn med css. Sæde der er checked bliver reserveret bliver den sat til disable
function seatItem(seat) {
    return `
        <label class="seat">
            <input type="checkbox" value="${seat.id}" ${seat.taken ? "disabled" : ""}>
            <span>${seat.row}${seat.number}</span>
        </label>
    `;
}

function ticketTypeItem(ticketType) {
    return `
        <option value="${ticketType.id}">
            ${ticketType.name} - ${ticketType.price} kr
        </option>
    `;
}

async function submitReservation() {
    const message = document.getElementById("message");
    const ticketTypeId = document.getElementById("ticketType").value;

    // Find de afkrydsede sæder. Hvis der ingen er, skriv besked til bruger
    const checked = document.querySelectorAll("#seat-rows input:checked");
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
        `${state.apiBaseUrl}/api/reservation/${state.selectedShowingId}?seatIds=${seatIds}&ticketTypeId=${ticketTypeId}`,
        reservation
    );

    if (!result) {
        message.textContent = "Could not reserve ticket.";
        return;
    }

    await renderReservation();
    document.getElementById("message").textContent = "Ticket reserved!";
}