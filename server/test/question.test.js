const { describe, after, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllUsers = require('../helpers/deleteAllUsers');

chai.use(chaiHttp);

const listUserToken = [];

const { expect } = chai;

after(done => deleteAllUsers(done));

describe('INIT USER', function() {
  it('USER 1', function(done) {
    chai
      .request(app)
      .post('/users/register')
      .send({ email: 'catherine@email.com', password: '12345' })
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal(
          'User has been successfully created!'
        );
        expect(res.body).to.have.property('token');
        listUserToken.push(res.body.token);
        done();
      })
      .catch(err => done(err));
  });

  it('USER 2', function(done) {
    chai
      .request(app)
      .post('/users/register')
      .send({ email: 'nadia@email.com', password: '12345' })
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal(
          'User has been successfully created!'
        );
        expect(res.body).to.have.property('token');
        listUserToken.push(res.body.token);
        done();
      })
      .catch(err => done(err));
  });
});

describe('TEST QUESTION', function() {
  describe('CREATE', function() {
    it('PERFECT WORLD', function(done) {
      chai
        .request(app)
        .post('/questions')
        .send({
          title: 'How to Fix Vue.js bug?',
          description: `There's something strange with my code. Please fix it!`
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
        })
        .catch(err => done(err));
    });
  });

  // describe('READ ALL', function() {
  //   it('PERFECT WORLD', function(done) {});
  // });

  // describe('READ ONE', function() {
  //   it('PERFECT WORLD', function(done) {});
  // });

  // describe('UPDATE', function() {
  //   it('PERFECT WORLD', function(done) {});
  // });

  // describe('DELETE', function() {
  //   it('PERFECT WORLD', function(done) {});
  // });
});
