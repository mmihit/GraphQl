
import { queryData } from "./query.js";
import { loadHtmlContent } from "./renderPage.js";


const token = localStorage.getItem("jwt");

async function App() {
    try {
        if (token) {
            const user = await queryData(token, "{user{id}}");
            if (user) {
                console.log("Profile Page of user : ", user);
                loadHtmlContent('home')
            } else {
                console.log("Login Page of user : ");
                loadHtmlContent('login')
            }
        } else {
            console.log("Login Page of user : ");
            loadHtmlContent('login');
        }
    } catch (error) {
        console.error("Error initializing app:", error);
        loadHtmlContent('login')
    }
}

App();