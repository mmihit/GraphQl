import { loadHtmlContent } from "./renderPage.js"


function setLogout() {

    const btn = document.getElementById('logout-btn');
    if (btn) {
        btn.addEventListener("click", (even) => {
            even.preventDefault();
            localStorage.clear("jwt");
            loadHtmlContent("login");
        })
    }
} 

setLogout()