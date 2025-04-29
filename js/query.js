async function queryData(token, query) {
    
    try {
        const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body : JSON.stringify({
                query : query
            })
        })
    
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`); 
        }
        
        const data = await response.json();
    
        return data.data || null;

    } catch (error) {

        console.error("Query failed:", error);
        return null;
    }  
}

export {queryData}