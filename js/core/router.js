function navigate(page) {
    if (page === "home") renderHome();
    if (page === "movie") renderMovie();
    if (page === "admincreate") renderAdminCreateMovie();
    if (page === "adminhome") renderAdminHomePage();


}

function router() {
    const page = location.hash.replace("#", "") || "home";
    navigate(page);
}

window.addEventListener("hashchange", router);
router();
