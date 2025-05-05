import { queryData } from "./query.js";
import { loadHtmlContent } from "./renderPage.js";

async function login(identifier, password) {

    const encodeLoginToBase64 = btoa(`${identifier}:${password}`);
    console.log(encodeLoginToBase64);

    try {
        const respons = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                "Authorization": `basic ${encodeLoginToBase64}`
            }
        });
        if (respons.ok) {

            const token = await respons.json();
            localStorage.setItem('jwt', token);

            setTimeout(async () => {
                if (await queryData(token, "{user{id}}")) {
                    loadHtmlContent('home')
                }
            }, 100)
        } else {

            document.querySelector(".login-error").classList.remove("hidden");
        }
    } catch (error) {
        console.error("identifier error :", error);
    }
}

export function handleLoginEvents() {

    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault()
        const identifier = document.getElementById("email");
        const password = document.getElementById("password");
        login(identifier.value, password.value);
        identifier.value = "";
        password.value = "";
    })
}