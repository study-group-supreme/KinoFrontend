function navigate(page) {
    if (page === "home") renderHome();
    if (page === "movie") renderMovie();
    if(page ==="reservation") renderReservation();
    if(page === "editMovie") renderEditMovieForm();
    if (page === "admin_create") renderAdminCreateMovie();
    if (page === "admin_home") renderAdminHomePage();


    if (page === "ticketType") renderTicketTypeSelection();
}

function router() {
    const page = location.hash.replace("#", "") || "home";
    navigate(page);
}

window.addEventListener("hashchange", router);
router();
