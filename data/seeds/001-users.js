const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('123', 8);

exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, name: 'Tim', email: 'tim@fakemail.com', password: hash },
    { id: 2, name: 'Vanessa', email: 'vanessa@fakemail.com', password: hash },
    { id: 3, name: 'Kim', email: 'kim@fakemail.com', password: hash }
  ]);
};
