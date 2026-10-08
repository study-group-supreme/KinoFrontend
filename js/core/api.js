async function apiGet(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

async function apiPost(url, body) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Post error:", error);
        return null;
    }
}

async function apiPut(url, body){
    try{
        const response = await fetch(url,{
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch(error){
        console.error("Put error:", error);
        return null;
    }
}
async function apiDelete(url) {
    try {
        const response = await fetch(url, {method: "DELETE"});

        const text = await response.text();

        if (!response.ok) {
            const json = JSON.parse(text);
            return {error: json.error};
        }

        return null;

    } catch (error) {
        return {error: error.message};
    }
}