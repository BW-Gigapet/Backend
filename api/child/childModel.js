const db = require('../../data/dbConfig.js');

module.exports = {
  addMeal,
  find,
  findBy,
  findById,
  findParentById,
  findMeals,
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
