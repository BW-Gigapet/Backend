const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

async function truncate() {
  await db.raw(`TRUNCATE TABLE meals, "childAccounts", users CASCADE`);
};

beforeEach(() => {
  return truncate();
});

describe('auth-router.js', () => {
  
  describe('POST /register', () => {
    it('should return json with a 201 http status code', () => {
      return request(server).post('/api/register')
        .send({ name: "steven", email:'steven@mail.com', password: "123" })
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(201);
        });
    });

    it('it should return an obj with username and hashed password', () => {
      return request(server).post('/api/register')
        .send({ name: "drolon", email:'d@mail.com',password: "123" })
        .then(res=>{
          expect(res.body.userAdded.name).toBe('drolon');
          expect(bcrypt.compareSync('123', res.body.userAdded.password)).toBe(true);
        })

    });
  });
  describe('POST /login', () => {
    it('should return json with a 200 http status code', () => {
      return request(server).post('/api/register')
        .send({ name: "drolon", email:'d@mail.com',password: "123" })
        .then(r => {
          return request(server).post('/api/login')
            .send({ email:'d@mail.com', password: "123" })
            .then(res => {
              expect(res.type).toMatch(/json/i);
              expect(res.status).toEqual(200);
            })
        })
    });
    it('should return an object with a message and token', async () => {
      await request(server).post('/api/register')
        .send({ name: "john", email:'j@mail.com', password: "123" });

      const res = await request(server).post('/api/login')
        .send({ email:'j@mail.com', password: "123" });

      expect(res.body.message).toBe('Welcome john!');
      expect(res.body.token);
    });
    it('should return a valid token with proper information', async () => {
      await request(server).post('/api/register')
        .send({ name: "john", email:'j@mail.com', password: "123" });

      const res = await request(server).post('/api/login')
        .send({ email:'j@mail.com', password: "123" });

      jwt.verify(res.body.token, secrets.jwtSecret, (err, decodedToken) => {
        expect(decodedToken.name).toBe('john');
      })

    });
  });
})