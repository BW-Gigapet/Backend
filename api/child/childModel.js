const db = require('../../data/dbConfig.js');

module.exports = {
  addMeal,
  find,
  findBy,
  findById,
  findParentById,
  findMeals,
  findMealsType,
  findMealsDate,
  findMealsDateType,
  update,
  remove,
};

function find() {
  return db('childAccounts').select('id', 'name', 'parent_id');
}

function findBy(filter) {
  return db('childAccounts').where(filter);
}

function findById(id) {
  return db('childAccounts')
    .where({ id })
    .first();
}

function findMealById(id) {
  return db('meals')
    .where({ id })
    .first();
}

function findParentById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findMeals(id) {
  return db('meals')
    .where({ child_id: id });
}

function findMealsType(foodType, id) {
  return db('meals')
    .where({ child_id: id })
    .whereRaw('LOWER(name) LIKE ?', '%'+foodType.toLowerCase()+'%')
}

function findMealsDate(filter, id) {
  let range = converDateFilterToRange(filter);
   return db('meals')
     .where({ child_id: id })
     .whereBetween('date',[range.start,range.end])
 }

 function findMealsDateType(foodType,filter, id) {
  let range = converDateFilterToRange(filter);
  console.log("Date range: ",range)
   return db('meals')
     .where({ child_id: id })
     .whereRaw('LOWER(name) LIKE ?', '%'+foodType.toLowerCase()+'%')
     .whereBetween('date',[range.start,range.end])
 }

async function addMeal(meal) {
  const [id] = await db('meals').insert(meal,'id');

  return findMealById(id);
}

function update(changes, id){
  return db('childAccounts')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

function remove(id){
  let child = findById(id);
  return db('childAccounts')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return child;
      } else{
        return null;
      }
    });
}

function converDateFilterToRange(filter){
  const tmp = filter.toLowerCase();
   let curDate = new Date();
   let yesterday = new Date(curDate.getFullYear(), curDate.getMonth(),curDate.getDate() - 1);
  
  let range = {};
  switch(tmp){
    case 'today':
      range = {start:curDate,end:curDate};
      break;
    case 'yesterday':
        range = {start:yesterday,end:yesterday};
        break;
    case 'weekly':
        let curWeekFirst = new Date(curDate.getFullYear(), curDate.getMonth(),(curDate.getDate() - curDate.getDay()));
        let curWeekLast = new Date(curDate.getFullYear(), curDate.getMonth(),(curWeekFirst.getDate() + 6));
        range = {start:curWeekFirst,end:curWeekLast};
        break;
    case 'monthly':
        let curMonthFirst = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
        let curMonthLast = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
        range = {start:curMonthFirst,end:curMonthLast};
        break;
    case 'prevSeven':
        //let lastSeven = new Date((yesterday.getDate() - 7));
        let lastSeven = new Date(yesterday);
        lastSeven.setDate(lastSeven.getDate()-7)
        range = {start:lastSeven,end:yesterday};
        break;
    case 'prevThirty':
        //let lastThirty = new Date(yesterday.getDate() - 30);
        let lastThirty = new Date(yesterday);
        lastThirty.setDate(lastThirty.getDate()-30)
        range = {start:lastThirty,end:yesterday};
        break;
    default:
      break;
  }

  return range;
}
