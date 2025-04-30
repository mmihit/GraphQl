import { renderLogin } from "./index.js";


function setLogout() {

    const btn = document.getElementById('logout-btn');
    console.log(btn)
    if (btn) {
        btn.addEventListener("click", (even) => {
            even.preventDefault();
            localStorage.clear("jwt");
            renderLogin();
        })
    }
} 
setLogout()

