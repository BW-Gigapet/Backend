const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  addChild,
  find,
  findBy,
  findById,
  findChildById,
  findAllChildAccounts,
  findChildMeals,
  update,
  remove,
};

function find() {
  return db('users').select('id', 'name','email');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user,'id');

  return findById(id);
}

async function addChild(child) {
  const [id] = await db('childAccounts').insert(child,'id');

  return findChildById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
    .select('id', 'name','email');
}

function findChildById(id) {
  return db('childAccounts')
    .where({ id })
    .first();
}

function findAllChildAccounts(id) {
  return db('childAccounts')
    .where({ parent_id:id })
}

function findChildMeals(id) {
  return db('meals')
    .where({ child_id: id })
}

function update(changes, id){
  return db('users')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

function remove(id){
  let user = findById(id);
  return db('users')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return user;
      } else{
        return null;
      }
    });
}
