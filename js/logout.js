import { renderLogin } from "./index.js";


export function setLogout() {
    const btn = document.getElementById('logout-btn');
    if (btn) {
        btn.addEventListener("click", (even) => {
            even.preventDefault();
            localStorage.clear("jwt");
            renderLogin();
        })
    }
} 