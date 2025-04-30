import { queryData } from "./query.js";

const querymoduleInfo = `
  {
	transaction(where:{event: {path: {_eq: "/oujda/module"}} type: {_eq: "xp"}}) {
    type
    amount
    createdAt
    object{
      name
    }
  }
}`


let moduleData = [];

export async function moduleInfo() {

    const token = localStorage.getItem('jwt');
    const data = await queryData(token, querymoduleInfo);

    data.transaction.forEach(element => {
        moduleData.push({
            name: element.object.name,
            amount: element.amount,
            date: new Date(element.createdAt)
        })
    });
    return moduleData;
}
