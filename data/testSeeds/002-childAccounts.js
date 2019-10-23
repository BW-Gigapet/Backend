
exports.seed = function (knex) {
  return knex('childaccounts').insert([
    {name: 'Issac', parent_id:1 }
  ],'id');
};
