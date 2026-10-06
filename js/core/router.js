function navigate(page) {
    if (page === "home") renderHome();
    if (page === "movie") renderMovie();
    if (page === "showings") renderShowings();
    if (page === "new-movie") renderNewMovie();
}

function router() {
    const page = location.hash.replace("#", "") || "home";
    navigate(page);
}

window.addEventListener("hashchange", router);
router();
