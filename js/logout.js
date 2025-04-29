import { renderLogin } from "./index.js";


export function setLogout(btn) {
    if (btn) {
        btn.addEventListener("click", (even) => {
            even.preventDefault();
            localStorage.clear("jwt");
            renderLogin();
        })
    }
} 