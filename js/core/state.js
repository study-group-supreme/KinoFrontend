const state = {
    apiBaseUrl:
        window.location.hostname === "localhost"
            ? "http://localhost:8080"
            : window.location.origin,

    selectedMovieId: null,
    selectedShowingId: null,
    movies: []
};