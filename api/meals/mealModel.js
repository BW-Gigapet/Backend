const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db('meals').select('id', 'name', 'portionSize', 'date', 'time', 'child_id');
}

function findBy(filter) {
  return db('meals').where(filter);
}

function findById(id) {
  return db('meals')
    .where({ id })
    .first();
}

function update(changes, id){
  return db('meals')
    .where({ id })
    .update(changes)
    .then( ()=>{
      return findById(id);
    });
}

async function remove(id){
  let meal = await findById(id);
  return db('meals')
    .where({id})
    .del()
    .then(res=>{
      if(res){
        return meal;
      } else{
        return null;
      }
    });
}
