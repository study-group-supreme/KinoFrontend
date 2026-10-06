async function loadTicketTypes() {
    const ticketTypes = await apiGet(`${state.apiBaseUrl}/api/ticketType`);
    if (!ticketTypes) {
        console.error("Could not load ticket types");
        return [];
    }
    state.ticketTypes = ticketTypes;
    return ticketTypes;
}

async function renderTicketTypeSelection(container) {
    const ticketTypes = await loadTicketTypes();
    container.appendChild(createTicketTypeDropdown(ticketTypes));
}

function createTicketTypeDropdown(ticketTypes) {
    const select = document.createElement("select");
    select.id = "ticketTypeSelect";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select ticket type";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    for (const ticketType of ticketTypes) {
        const option = document.createElement("option");
        option.value = ticketType.id;
        option.textContent = `${ticketType.name} - ${ticketType.price} kr`;
        select.appendChild(option);
    }

    select.addEventListener("change", () => {
        state.selectedTicketTypeId = Number(select.value);
    });

    return select;
}