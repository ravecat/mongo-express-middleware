import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../config';
import app from '../app';
import { Elements } from '../model';
import element from './data.json';

chai.use(chaiHttp);
chai.should();

describe('API/api/elements', function() {
  before(function(done) {
    const { databaseName, databaseHost, databasePort } = config;

    mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, {
      useNewUrlParser: true,
    });

    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function() {
      /* eslint-disable-next-line no-console */
      console.log('\nConnection to mongo successfully established\n');
    });

    done();
  });

  beforeEach(function(done) {
    Elements.deleteMany({}, err => {
      done();
    });
  });

  it('GET/api/elements Get element list', function(done) {
    chai
      .request(app)
      .get('/api/elements')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('POST/api/elements Create element successfully', done => {
    chai
      .request(app)
      .post('/api/elements')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('symbol');
        done();
      });
  });

  it('GET/api/elements/:id Get element by atomic number', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/api/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('symbol');
          res.body.should.have.property('atomic_number').eql(element.atomic_number);
          done();
        });
    });
  });

  it('PUT/api/elements/:id Update element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .put(`/api/elements/${data._id}`)
        .send({ ...data._doc, name: 'Updated' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('symbol');
          res.body.should.have.property('name').eql('Updated');
          done();
        });
    });
  });

  it('DELETE/api/elements/:id Delete element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .delete(`/api/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(`${data._id}`);
          done();
        });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});
