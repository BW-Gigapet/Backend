const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');

async function truncate() {
  await db.raw(`TRUNCATE TABLE meals, "childAccounts", users CASCADE`);
};

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AZmFrZW1haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3MTg0ODAzMiwiZXhwIjoxNTcxOTM0NDMyfQ.xx6kzkmPPa6i1O4fkVWmq9iFwSM-SFMJP6RPsaWAnaw';

beforeEach(async () => {
  return truncate();
});

describe('mealRouter.js', () => {

  describe('GET /', () => {
    it('should return json with a 200 http status code with proper data', () => {
      return request(server).get('/api/meals')
        .set('authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(0);
        });
    });
  });

  describe('GET /:id', () => {
    it('should return json with a 404 http status code, no meals exists', () => {

      return request(server).get('/api/meals/1')
        .set('authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(404);
        })
    })
  });

  describe('PUT /:id', () => {
    it('should return json with a 404 http status code, no meals exists', () => {
      return request(server).put('/api/meals/1')
        .set('authorization', token)
        .send({name:'Fruits'})
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(404);
        });
    }); 
  });

  describe('DELETE /:id', () => {
    it('should return json with a 404 http status code, no meals exists', () => {
      return request(server).del('/api/meals/1')
        .set('authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(404);
        });
    }); 
  });

})