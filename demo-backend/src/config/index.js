import dotenv from 'dotenv'
dotenv.config()

import dev from './dev'
import production from './production'
import test from './test'

const config = {
  port: 8080,
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  consumerRole: 'Consumer',
  providerRole: 'Provider',

  //TODO: Move to test env config
  mockConsumerToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8',
  mockConsumerId: '5aa981af1d5b712a51cfbdf6',
  mockConsumerUsername: 'consumer-username',
  mockProviderToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
  mockProviderId: '5aa981af1d5b712a51cfbdf7',
  mockProviderUsername: 'provider-username',
}


export const setupConfig = () => {
  let exportCfg

  if(process.env.NODE_ENV === 'test') {
    exportCfg = {
      ...config,
      ...test()
    }
  }
  else if(process.env.NODE_ENV === 'prod') {
    exportCfg = {
      ...config,
      ...production()
    }
  }
  else {
    exportCfg = {
      ...config,
      ...dev()
    }
  }

  return exportCfg
}

export default setupConfig()
