'use strict';

import jwt from 'jsonwebtoken';
import config from '../../config'

const jwtVerifyMock = (sandbox) => {
  sandbox.stub(jwt, 'verify').callsFake(function(token, tokenSecret, options, callback) {
    const mockConsumer = {
      id:       config.mockConsumerId,
      username: config.mockConsumerUsername,
      role:     config.consumerRole,
      point:    [-34.617529, -58.368317]
    };

    const mockProvider = {
      id:       config.mockProviderId,
      username: config.mockProviderUsername,
      role:     config.providerRole,
      point:    [-34.617529, -58.368317]
    };

    let users = {}
    users[config.mockConsumerToken] = mockConsumer;
    users[config.mockProviderToken] = mockProvider;

    let user = users[token];
    return user ? callback(null, user) : callback('No mocked user', null);
  });
}

export default jwtVerifyMock;