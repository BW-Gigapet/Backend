const localPg = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'gigapet',
};

const pgUser = process.env.PG_USER || 'postgres';
const pgDb = process.env.PG_DB || 'gigapet';
const testDb = 'gigapet-test';

const prodConnection = `postgres://${pgUser}:rein@localhost/${pgDb}`;
const testConnection = `postgres://${pgUser}:rein@localhost/${testDb}`;

module.exports = {

  development: {
    client: 'pg',
    connection: prodConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  testing: {
    client: 'pg',
    connection: testConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: prodConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

};
