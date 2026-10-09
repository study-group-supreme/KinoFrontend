function navigate(page) {
    if (page === "home") renderHome();
    if (page === "movie") renderMovie();
    if(page ==="reservation") renderReservation();
    if(page === "editMovie") renderEditMovieForm();
    if (page === "admin_create") renderAdminCreateMovie();
    if (page === "admin_home") renderAdminHomePage();
    if (page === "admin_showing") renderAdminShowingPage();
    if (page === "admin_createShowing") renderAdminCreateShowing();


    if (page === "movieShowings") renderShowingsPage();
    if(page === "showingTickets") renderShowingTicketsPage();
    if (page === "ticketType") renderTicketTypeSelection();
    if (page === "editShowing") renderEditShowingForm();
}

function router() {
    const page = location.hash.replace("#", "") || "home";
    navigate(page);
}

window.addEventListener("hashchange", router);
router();
