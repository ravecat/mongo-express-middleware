import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../config';
import app from '../app';
import { Elements } from '../model';
import element from './data.json';

chai.use(chaiHttp);
chai.should();

describe('API/elements', function() {
  before(function(done) {
    const { databaseName, databaseHost, databasePort } = config;

    mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, {
      useNewUrlParser: true,
    });

    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function() {
      console.warn('\nConnection to mongo successfully established\n');
    });

    done();
  });

  it('POST/elements Create element', done => {
    chai
      .request(app)
      .post('/elements')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('symbol');
        done();
      });
  });

  it('POST/elements Create element (rewrited)', done => {
    chai
      .request(app)
      .post('/custom')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('customData');
        done();
      });
  });

  it('GET/elements Get element list', function(done) {
    chai
      .request(app)
      .get('/elements')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      });
  });

  it('GET/elements Get element list with params', function(done) {
    chai
      .request(app)
      .get('/elements?atomic_number=1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      });
  });

  it('GET/elements Get element list (rewrited)', function(done) {
    chai
      .request(app)
      .get('/custom')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('customData');
        done();
      });
  });

  it('GET/elements/:id Get element by atomic number', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/elements/${data._id}`)
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

  it('GET/elements/:id Get element by atomic number (rewrited)', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .get(`/custom/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('customData');
          done();
        });
    });
  });

  it('PUT/elements/:id Update element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .put(`/elements/${data._id}`)
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

  it('PUT/elements/:id Update element (rewrited)', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .put(`/custom/${data._id}`)
        .send({ ...data._doc, name: 'Updated' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('customData');
          done();
        });
    });
  });

  it('DELETE/elements/:id Delete element', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .delete(`/elements/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(`${data._id}`);
          done();
        });
    });
  });

  it('DELETE/elements/:id Delete element (rewrited)', done => {
    Elements.create(element, (err, data) => {
      chai
        .request(app)
        .delete(`/custom/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('customData');
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
