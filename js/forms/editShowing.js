async function renderEditShowingForm(){
    const showing = await apiGet(`${state.apiBaseUrl}/api/showing/${state.selectedShowingId}`);
    if(!showing){
        location.hash = "home"
        return;
    }
    document.getElementById("app").innerHTML = `
    <h1>Edit Showing Form</h1>
    <form id="edit-movie-form" class="form">
        <p><label><input type="hidden" id="showing-id"></label></p>
        <p></p>
    
    </form>
    `

}