import { queryData } from "./query.js";

const queryheaderData = `
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


const headerData = {
    fullName: "",
    totalUp: 0,
    totalUpBonus: 0,
    totalDown: 0,
    auditRatio: 0,
    level: 0,
    totalXp: 0,
};

export async function HeaderData() {

    const token = localStorage.getItem("jwt");

    if (!token) return null;

    try {
        const data = await queryData(token, queryheaderData);

        if (!data || !data.user || !data.user[0]) return null;

        const user = data.user[0];
        const transactions = data.transaction || [];

        headerData.fullName = `${user.firstName} ${user.lastName}`;
        headerData.totalUp = user.totalUp || 0;
        headerData.totalUpBonus = user.totalUpBonus || 0;
        headerData.totalDown = user.totalDown || 0;
        headerData.auditRatio = user.auditRatio.toFixed(1) || 0;
        headerData.totalXp = 0;
        transactions.forEach(element => {
            if (element.type == "level") {
                (element.amount > headerData.level) ? headerData.level = element.amount : headerData.level = headerData.level;
            } else {
                headerData.totalXp += element.amount;
            }
        });


    } catch (error) {
        console.error("Failed to fetch header info:", error);
    }
    return headerData;
}