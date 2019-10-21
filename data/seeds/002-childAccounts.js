
exports.seed = function (knex) {
  return knex('childAccounts').insert([
    { id: 1, name: 'Issac', parent_id:1 },
    { id: 2, name: 'Allison', parent_id:1 },
    { id: 3, name: 'Cristine', parent_id:2 },
    { id: 4, name: 'Yvette', parent_id:2 },
    { id: 5, name: 'Bryan', parent_id:3},
    { id: 6, name: 'Andy', parent_id:3}
  ]);
};
