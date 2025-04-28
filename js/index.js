
import { handleLoginEvents } from "./login.js";
import { queryData } from "./query.js";
import { login , profile} from "./templat.js";


const token = localStorage.getItem("jwt");


async function App() {
    try {
        if (token) {
            const user = await queryData(token, "{user{id}}");
            if (user) {
                console.log("Profile Page of user : ", user);
                renderProfile();
            } else {
                console.log("Login Page of user : ");
                renderLogin();
            }
        } else {
            console.log("Login Page of user : ");
            renderLogin();
        }
    } catch (error) {
        console.error("Error initializing app:", error);
        renderLogin();
    }
}

export function renderProfile() {
    
    document.body.innerHTML = profile;
}

export function renderLogin() {

    document.body.innerHTML = login
    handleLoginEvents();
}

App();