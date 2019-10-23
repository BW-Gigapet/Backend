const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

const Promise = require('bluebird');

const tables = [
  'meals',
  'childAccounts',
  'users'
];

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3ZlbiIsImVtYWlsIjoic3ZlbkBmYWtlbWFpbC5jb20iLCJpZCI6MzUsImlhdCI6MTU3MTg2MjMzMywiZXhwIjoxNTcxOTQ4NzMzfQ.0_SnTpKkKZzThqEx4umlhb9rSMPHVoM-XNlK215dxew'

function truncate() {
  return Promise.each(tables, function (table) {
    return db.raw('truncate table ' + table + ' cascade');
  });
};

describe('userRouter.js', () => {
  beforeAll(() => {
    return truncate();
  });
  
  describe('GET /', () => {
    it('should return json with a 200 http status code and proper data', async () => {
      const r = await request(server).post('/api/register')
        .send({ name: "steven", email: 'steven@mail.com', password: "123" })

      const res = await request(server).get('/api/users/').set('authorization', token);
      expect(res.type).toMatch(/json/i);
      expect(res.status).toEqual(200);
      expect(res.body.users.length).toEqual(1);
    });
  });

});