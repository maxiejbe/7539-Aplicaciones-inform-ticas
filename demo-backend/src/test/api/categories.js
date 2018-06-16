import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import User from '../../models/user';
import sinon from 'sinon';
import jwtVerifyMock from '../mocks/jwtVerifyMock'
import config from '../../config'
import Category from '../../models/category';

let should = chai.should()

chai.use(chaiHttp)

describe('Categories', () => {

  let sandbox;

  before(function(done) {
    sandbox = sinon.createSandbox();
    jwtVerifyMock(sandbox);
    done();
  });

  after(function() {
    sandbox.restore();
  });

  beforeEach((done) => {

    let category1 = {
      _id:  '5aa981af1d5b712a51cfbdf6',
      name: 'Category1'
    };
    let category2 = {
      _id:  '5aa981af1d5b712a51cfbdf7',
      name: 'Category2'
    };

    let consumerUser = {
      _id:      config.mockConsumerId,
      username: config.mockConsumerUsername,
      role:     config.consumerRole
    }

    Promise.all([
      Category.create([category1, category2]),
      User.create(consumerUser)
    ]).then(() => {
      done()
    }).catch(err => {
      done()
    })
  })

  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Category.remove({})
    ]).then(() => {
      done()
    }).catch(err => {
      done()
    })
  })

  describe('/GET categories', () => {
    it('it should return all categories', done => {
      chai.request(server)
        .get('/api/categories')
        .set('authorization', config.mockConsumerToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.length(2);
          done()
        })
    })

    it('it should return unauthorized', done => {
      chai.request(server)
        .get('/api/categories')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

  })
})
