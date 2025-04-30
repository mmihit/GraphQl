
import { handleLoginEvents } from "./login.js";
import { queryData } from "./query.js";
import { login, profile } from "./templat.js";
import { moduleInfo } from "./moduleViewData.js";


const token = localStorage.getItem("jwt");

async function App() {
    try {
        if (token) {
            const user = await queryData(token, "{user{id}}");
            if (user) {
                console.log("Profile Page of user : ", user);
                renderProfile();
                console.log(moduleInfo());
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

export function addScript(fileName) {f
    const indexScript = document.createElement("script");
    indexScript.type = "module";
    indexScript.src = fileName;
    document.body.appendChild(indexScript);
}

export function renderProfile() {

    document.body.innerHTML = profile;
}

export function renderLogin() {

    document.body.innerHTML = login
    handleLoginEvents();
}

App();