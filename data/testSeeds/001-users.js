const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('123', 8);

exports.seed = function (knex) {
  return knex('users').insert([
    {name: 'Tim', email: 'tim@fakemail.com', password: hash }
  ],'id');
};
