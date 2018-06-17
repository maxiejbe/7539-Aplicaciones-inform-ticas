import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import User from '../../models/user';
import sinon from 'sinon';
import jwtVerifyMock from '../mocks/jwtVerifyMock'
import config from '../../config'
import Group from '../../models/group';
import { groupProducts } from '../../models/group';
import Product from '../../models/product';
import generateRandomPoint from '../../lib/geo';

let should = chai.should()

chai.use(chaiHttp)

describe('Groups', () => {

  let sandbox;
  const RANDOM_POINT_RADIUS = config.searchRadius;
  const RANDOM_POINT_CENTER = {
    lat: -34.617529,
    lng: -58.368317
  }
  const FAR_AWAY_POINT = [-34.6009902550306, -58.3704876700107];

  let centerPoint = [RANDOM_POINT_CENTER.lat, RANDOM_POINT_CENTER.lng]
  let randomPoint = generateRandomPoint(RANDOM_POINT_CENTER, RANDOM_POINT_RADIUS);

  let product1 = {
    _id:  '5aa981af1d5b712a51cfbdf8',
    name: 'Product1',
  }

  let product2 = {
    _id:  '5aa981af1d5b712a51cfbdf9',
    name: 'Product2',
  }

  let consumerUser = {
    _id:      config.mockConsumerId,
    username: config.mockConsumerUsername,
    role:     config.consumerRole,
    point:    centerPoint,
    products: [{
      product:  product1._id,
      quantity: 2
    }, {
      product:  product2._id,
      quantity: 5
    }]
  }

  let consumerUser2 = {
    _id:      '5aa981af1d5b712a51cfbaf9',
    username: 'consumer2-username',
    role:     config.consumerRole,
    point:    centerPoint,
    products: [{
      product:  product1._id,
      quantity: 4
    }, {
      product:  product2._id,
      quantity: 6
    }]
  }

  let providerUser = {
    _id:      config.mockProviderId,
    username: config.mockProviderUsername,
    role:     config.providerRole,
    point:    centerPoint
  }

  let group1 = {
    _id:     '5aa981af1d5b712a51cfbdf6',
    name:    'Group1',
    owner:   consumerUser._id,
    members: [consumerUser._id, consumerUser2._id],
    point:   [randomPoint.lat, randomPoint.lng]
  };
  let group2 = {
    _id:     '5aa981af1d5b712a51cfbdf7',
    name:    'Group2',
    owner:   consumerUser._id,
    members: [],
    point:   FAR_AWAY_POINT
  };

  before(function(done) {
    sandbox = sinon.createSandbox();
    jwtVerifyMock(sandbox);
    done();
  });

  after(function() {
    sandbox.restore();
  });

  beforeEach((done) => {
    Promise.all([
      Product.create([product1, product2]),
      Group.create([group1, group2]),
      User.create([consumerUser, consumerUser2, providerUser])
    ]).then((res) => {
      done()
    }).catch(err => {
      done()
    })
  })

  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Group.remove({})
    ]).then(() => {
      done()
    }).catch(err => {
      done()
    })
  })

  describe('/GET groups', () => {
    it('it should return groups in which customer is member', done => {
      chai.request(server)
        .get('/api/groups')
        .set('authorization', config.mockConsumerToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.length(1);
          done()
        })
    })

    it('it should return provider nearby groups', done => {
      chai.request(server)
        .get('/api/groups')
        .set('authorization', config.mockProviderToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.length(1);
          done()
        })
    })

    it('it should return unauthorized', done => {
      chai.request(server)
        .get('/api/groups')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

  })

  describe('/GET groups/:id', () => {

    it('it should return group detailed data', done => {
      chai.request(server)
        .get('/api/groups/' + group1._id)
        .set('authorization', config.mockConsumerToken)
        .end((err, res) => {
          res.should.have.status(200);

          res.body._id.should.be.eql(group1._id);
          res.body.name.should.be.eql(group1.name);
          res.body.owner.should.be.eql(group1.owner);
          res.body.members.should.be.eql(group1.members);
          res.body.fullMembers.map(fm => res.body.members.should.contains(fm._id));

          let expectedGroupProducts = groupProducts(
            consumerUser.products.concat(consumerUser2.products)
          );

          //Group products should be the sum of all user products
          res.body.products.map(product => {
            let expectedProduct = expectedGroupProducts.find(expProduct => {
              return expProduct.product === product.product
            })
            expectedProduct.quantity.should.be.eql(product.quantity);
          })

          done()
        })
    })

  })
})
