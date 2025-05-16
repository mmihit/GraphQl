
import { queryData } from "./query.js";
import { loadHtmlContent } from "./renderPage.js";


const token = localStorage.getItem("jwt");

async function App() {
    try {
        if (token) {
            const user = await queryData(token, "{user{id}}");
            user ? loadHtmlContent('home') : loadHtmlContent('login');
        } else {
            loadHtmlContent('login');
        }
    } catch (error) {
        console.error("Error initializing app:", error);
        loadHtmlContent('login')
    }
}

App();