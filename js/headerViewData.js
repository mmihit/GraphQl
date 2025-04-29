import { queryData } from "./query.js";

const queryHeaderInfo = `
{
    user {
        firstName
        lastName
        totalUp
      	totalUpBonus
        totalDown
      	auditRatio
    }
   transaction(where: {event: {path: {_eq: "/oujda/module"}} type:{_regex: "level|xp"}}) {
        type
        amount
    }  
}`


export const headerInfo = {
    fullName: "",
    totalUp: 0,
    totalUpBonus: 0,
    totalDown: 0,
    auditRatio: 0,
    level: 0,
    totalXp : 0,
    unit : ""
};

export async function HeaderInfo() {

    const token = localStorage.getItem("jwt");

    if (!token) return null;

    try {
        const data = await queryData(token, queryHeaderInfo);

        if (!data || !data.user || !data.user[0]) return null;

        const user = data.user[0];
        const transactions = data.transaction || [];
        let level = 0;
        
        headerInfo.fullName = `${user.firstName} ${user.lastName}`;
        headerInfo.totalUp = user.totalUp || 0;
        headerInfo.totalUpBonus = user.totalUpBonus || 0;
        headerInfo.totalDown = user.totalDown || 0;
        headerInfo.auditRatio = user.auditRatio.toFixed(1) || 0;
        transactions.forEach(element => {
            if (element.type == "level") {
                (element.amount > headerInfo.level) ? headerInfo.level = element.amount : headerInfo.level = headerInfo.level;
            } else {
                headerInfo.totalXp += element.amount;
            }
        });

        headerInfo.unit = "KB";
        if (headerInfo.totalXp  >= 1000000) {
            headerInfo.totalXp  = (headerInfo.totalXp  / 1000000).toFixed(2)
            headerInfo.unit = "MB";
        } else headerInfo.totalXp  = Math.round(headerInfo.totalXp  / 1000);
    

    } catch (error) {
        console.error("Failed to fetch header info:", error);
    }
    return headerInfo;
}