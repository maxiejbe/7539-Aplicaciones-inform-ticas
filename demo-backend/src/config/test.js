const test = () => {
  return {
    env:       'test',
    db:        process.env.TEST_MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    port:      process.env.PORT || 8080,

    mockConsumerToken:    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8',
    mockConsumerId:       '5aa981af1d5b712a51cfbdf6',
    mockConsumerUsername: 'consumer-username',
    mockProviderToken:    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
    mockProviderId:       '5aa981af1d5b712a51cfbdf7',
    mockProviderUsername: 'provider-username'
  }
}

export default test
