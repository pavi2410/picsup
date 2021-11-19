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
});