function renderShowingTicketsPage() {
    const { movie, tickets } = state.selectedShowing;

    let total = 0;
    for (const ticket of tickets) {
        total += ticket.price;
    }

    document.getElementById("app").innerHTML = `
        <h1>Tickets for ${movie.name}</h1>
        <button id="back-btn">Back</button>
        <p>${tickets.length} tickets sold</p>
        <p>Total revenue: ${total} kr.-</p>
        <table>
            <thead>
                <tr><th>Ticket id</th><th>Seat</th><th>Type</th><th>Price</th></tr>
            </thead>
            <tbody>
                ${tickets.map(ticket => `
                    <tr>
                        <td>${ticket.ticketId}</td>
                        <td>${ticket.seatRow}${ticket.seatNum}</td>
                        <td>${ticket.ticketType}</td>
                        <td>${ticket.price} kr</td>
                    </tr>`).join("")}
            </tbody>
        </table>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
        location.hash = "movieShowings";
    });
}