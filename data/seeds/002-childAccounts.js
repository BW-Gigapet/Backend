
exports.seed = function (knex) {
  return knex('childAccounts').insert([
    {name: 'Issac', parent_id:1 },
    {name: 'Allison', parent_id:1 },
    {name: 'Cristine', parent_id:2 },
    {name: 'Yvette', parent_id:2 },
    {name: 'Bryan', parent_id:3},
    {name: 'Andy', parent_id:3}
  ]);
};
