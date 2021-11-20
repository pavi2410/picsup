const request = require('supertest');
const { expect } = require('chai');
const app = require('../index.js');
const { before } = require('mocha');

describe('Test API routes', () => {

  before((done) => setTimeout(done, 8000));

  it('GET /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text/)
      .expect((res)=> {
        expect(res.text).to.be.equal('Hello World!');
      })
      .end(done)
  });

  it('should signup the user - POST /signup', (done) => {
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

  it('should login the user - POST /login', (done) => {
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