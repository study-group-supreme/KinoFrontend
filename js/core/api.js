async function apiGet(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}
