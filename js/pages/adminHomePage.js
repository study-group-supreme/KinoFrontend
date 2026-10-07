async function renderAdminHomePage() {

    const movies = await apiGet(`${state.apiBaseUrl}/api/movies`);
    state.movies = movies;




}