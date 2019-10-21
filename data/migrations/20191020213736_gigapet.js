
exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('name', 128)
        .notNullable();
      tbl.string('password', 128)
        .notNullable();
      tbl.string('email', 128)
        .notNullable()
        .unique();
    })

    .createTable('childAccounts', tbl => {
      tbl.increments();
      tbl.string('name',128)
        .notNullable();
      tbl.integer('parent_id', 5)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.unique(['parent_id','name']);
    })

    .createTable('meals', tbl=>{
      tbl.increments();
      tbl.string('name',128)
        .notNullable();
      tbl.string('portionSize', 128)
        .notNullable();
      tbl.date('date')
        .notNullable();
      tbl.time('time')
        .notNullable();
      tbl.integer('child_id', 5)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('childAccounts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists('meals')
  .dropTableIfExists('childAccounts')
  .dropTableIfExists('users')
};
