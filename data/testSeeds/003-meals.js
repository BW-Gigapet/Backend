
exports.seed = function (knex) {
  return knex('meals').insert([
    {name: 'Vegetables', portionSize:'small',date:'10/22/2019',time:'10:30',child_id:1 },
    {name: 'Protein', portionSize:'large',date:'10/22/2019',time:'10:30',child_id:1 },
  ],'id');
};
