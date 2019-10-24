const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');

async function truncate() {
  await db.raw(`TRUNCATE TABLE meals, "childAccounts", users CASCADE`);
};

describe('userRouter.js', () => {
  beforeEach(() => {
    return truncate();
  });
  
  describe('DELETE /:id', () => {
    it('should return json with a 200 http status code and proper data', () => {
      return request(server).post('/api/register')
        .send({ name: "steven", email: 'steven@mail.com', password: "123" })
        .then(r=>{
          return request(server).post('/api/login')
          .send({ email: 'steven@mail.com', password: "123" })
          .then(re=>{
            return request(server)
            .del(`/api/users/${r.body.userAdded.id}`)
            .set('authorization', re.body.token)
            .then(res=>{
              expect(res.type).toMatch(/json/i);
              expect(res.status).toEqual(200);
              expect(res.body.name).toMatch('steven');
            })
          })
        })
    });

    describe('PUT /:id', () => {
      it('should return json with a 200 http status code and proper data', () => {
        return request(server).post('/api/register')
          .send({ name: "steven", email: 'steven@mail.com', password: "123" })
          .then(r=>{
            return request(server).post('/api/login')
            .send({ email: 'steven@mail.com', password: "123" })
            .then(re=>{
              return request(server)
              .put(`/api/users/${r.body.userAdded.id}`)
              .set('authorization', re.body.token)
              .send({name:"blob"})
              .then(res=>{
                expect(res.type).toMatch(/json/i);
                expect(res.status).toEqual(200);
                expect(res.body.name).toMatch('blob');
              })
            })
          })
      });
    });

  });

  describe('GET /:id', () => {
    it('should return json with a 201 http status code and proper data', () => {
      return request(server).post('/api/register')
        .send({ name: "steven", email: 'steven@mail.com', password: "123" })
        .then(r=>{
          return request(server).post('/api/login')
          .send({ email: 'steven@mail.com', password: "123" })
          .then(re=>{
            return request(server)
            .get(`/api/users/${r.body.userAdded.id}`)
            .set('authorization', re.body.token)
            //.send({name:"blobby"})
            .then(res=>{
              console.log('hi: ', res.body)
              expect(res.type).toMatch(/json/i);
              expect(res.status).toEqual(200);
              expect(res.body.name).toMatch('steven');
            })
          })
        })
    });
  });

});