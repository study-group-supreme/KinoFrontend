function navigate(page) {
    if (page === "home") renderHome();
    if (page === "movie") renderMovie();
    if(page ==="reservation") renderReservation();
    if(page === "editMovie") renderEditMovieForm();
}

function router() {
    const page = location.hash.replace("#", "") || "home";
    navigate(page);
}

window.addEventListener("hashchange", router);
router();
