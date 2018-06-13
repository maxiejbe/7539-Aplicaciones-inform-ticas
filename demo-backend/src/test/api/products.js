import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import Product from '../../models/product'
import User from '../../models/user';
import sinon from 'sinon';
import jwtVerifyMock from '../mocks/jwtVerifyMock'
import config from '../../config'
import Category from '../../models/category';

let should = chai.should()

chai.use(chaiHttp)

describe('Products', () => {

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

    let category1 = {_id: '5aa981af1d5b712a51cfbdf6', name: 'Category1' };
    let category2 = {_id: '5aa981af1d5b712a51cfbdf6', name: 'Category2' };

    let product1 = {name: 'Product1', category: category1._id};
    let product2 = {name: 'Product2', category: category2._id};

    let consumerUser = {
      id: config.mockConsumerId,
      username: config.mockConsumerUsername,
      role: config.consumerRole
    }

    Promise.all([
      Category.create(category1),
      Category.create(category2),
      Product.create(product1),
      Product.create(product2),
      User.create(consumerUser)
    ]).then((res) => {
      console.log(res);
      done()
    }).catch(err => {
      done()
    })
  })

  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Product.remove({}),
      Category.remove({})
    ]).then(() => {
      done()
    }).catch(err => {
      done()
    })
  })

  describe('/GET products', () => {
    it('it should return all products', done => {
      chai.request(server)
      .get('/api/products')
      .set('authorization', config.mockConsumerToken)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.length(2);
        done()
      })
    })

    it('it should return unauthorized', done => {
      chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
    })

  })
})
