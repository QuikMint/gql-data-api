import path from 'path'
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')

const typesArray = loadFilesSync(path.join(__dirname, './'), { extensions: ['gql'] })

const typeDefs = mergeTypeDefs(typesArray)

import { RClient, clientMutation, clientQuery } from './Client/clientResolver'
import { RContract, contractMutation, contractQuery } from './Contract/contractResolver'
import { RCustomer, customerMutation, customerQuery } from './Customer/customerResolver'
import { RTransaction, transactionMutation, transactionQuery } from './Transaction/transactionResolver'

const resolvers = {

  Client: RClient,
  Contract: RContract,
  Customer: RCustomer,
  Transaction: RTransaction,

  Query: {
    ...clientQuery,
    ...contractQuery,
    ...customerQuery,
    ...transactionQuery,
  },

  Mutation: {
    ...clientMutation,
    ...contractMutation,
    ...customerMutation,
    ...transactionMutation
  }
}

export { typeDefs, resolvers }