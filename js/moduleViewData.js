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

  moduleData=[]

  var total = 0

  if (!data) return;

  data.transaction.forEach(element => {
    total+=element.amount
      moduleData.push({
          name: element.object.name,
          xp: total,
          date: new Date(element.createdAt)
      })
  });
  return moduleData;
}