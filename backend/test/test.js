const request = require('supertest');
const { expect } = require('chai');
const app = require('../index.js');

describe('Test API routes', () => {
  it('tests the endpoint /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text/)
      .expect((res)=> {
        expect(res.text).to.be.equal('Hello World!');
      })
      .end(done)
  });

  it('should signup the user - /signup', (done) => {
    request(app)
      .post('/signup')
      .send({
        email: 'testuser@example.com',
        password: 't3stp@ssw0rd',
        username: 'testuser'
      })
      .expect(200)
      .end(done);
  })

  it('should login the user - /login', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 't3stp@ssw0rd'
      })
      .expect(200)
      .end(done)
  }) 
});