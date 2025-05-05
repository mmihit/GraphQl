import { login, profile } from "./templat.js";
import { handleLoginEvents } from "./login.js";
import { UserNameHelper, LevelHelper, AuditHelper, LineGraph } from "./createGraphs.js";
import { HeaderData } from "./headerViewData.js";
import { moduleInfo } from "./moduleViewData.js";


export function renderProfile() {
    document.getElementById('dynamic-html').innerHTML = profile;
    addScript('./js/logout.js')
    setTimeout(createGraphs(), 500);
}

export function renderLogin() {
    document.getElementById('dynamic-html').innerHTML = login
    handleLoginEvents();
}

function addScript(fileName) {
    const dynamicScriptElement=document.getElementById('dynamic-script')
    const indexScript = document.createElement("script");

    dynamicScriptElement.innerHTML=''
    indexScript.type = "module";
    indexScript.src = fileName + `?cacheBuster=${Date.now()}`;;
    dynamicScriptElement.appendChild(indexScript);
}

async function createGraphs() {
    const headerData= await HeaderData();
    const moduleData=await moduleInfo();

    const userNameHelper = new UserNameHelper(headerData.fullName);
    const auditHelper = new AuditHelper(headerData.totalUp, headerData.totalDown, headerData.totalUpBonus, headerData.auditRatio);
    const levelAndXpHelper = new LevelHelper(headerData.level, headerData.totalXp);
    const lineGraph= new LineGraph(moduleData)

    userNameHelper.insertValueInDom();
    auditHelper.createGraph();
    levelAndXpHelper.createGraph();
    lineGraph.render();

    window.addEventListener('resize', () => {
        lineGraph.resize(document.getElementById('module-section').offsetWidth - 43.9, 300)
    })
}

export function loadHtmlContent(path) {
    if (path === 'login') renderLogin()
    else if (path === 'home' || !path) renderProfile();
}