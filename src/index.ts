import * as admin from 'firebase-admin'

const serviceAccount = require('../service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server'

const typeDefs = gql`
  type Client {
    id: ID!
    timestamp: Int!
    name: String!
    phone: String!
    email: String!
    website: String!
    admin: Boolean
    birthday: String!
    description: String!
    contracts: [Contract]!
    customers: [Customer]!
    transactions: [Transaction]!
  }
  type Contract {
    id: ID!
    timestamp: Int!
    address: String!
    baseuri: String!
    mintPrice: Int!
    minted: Int!
    name: String!
    owner: String!
    supply: Int!
    client: Client!
    client_id: String!
    customers: [Customer]!
    transactions: [Transaction]!
  }

  type Customer {
    id: ID!
    timestamp: Int!
    initiated: Boolean
    complete: Boolean!
    email: String!
    name: String!
    phone: String!
    client: Client!
    client_id: String!
    contract: Contract!
    contract_id: String!
    transactions: [Transaction!]!
  }

  type Transaction {
    id: ID!
    timestamp: Int!
    fee: Int!
    price: Int!
    client: Client!
    client_id: String!
    contract: Contract!
    contract_id: String!
    customer: Customer!
    customer_id: String!
  }

  type Query {
    client(id: String!): Client
    contracts(client: String!): [Contract]
    contract(id: String!): Contract
    customers(id: String!): [Customer]
    customer(id: String!): Customer
    transactions(id: String!): [Transaction]
    transaction(id: String!): Transaction
  }

  input ClientInput {
    name: String!
    phone: String!
    email: String!
    website: String!
    birthday: String!
    description: String!
  }

  input UpdateClientInput {
    id: ID!
    name: String
    phone: String
    email: String
    website: String
    description: String
  }

  input ContractInput {
    address: String!
    mintPrice: Int!
    minted: Int
    name: String!
    owner: String!
    supply: Int!
    client_id: String!
  }

  input UpdateContractInput {
    id: ID!
    address: String
    mintPrice: Int
    minted: Int
    name: String
    owner: String
    supply: Int
    client_id: String
  }

  input CustomerInput {
    timestamp: Int!
    email: String!
    name: String!
    phone: String!
    client_id: String!
    contract_id: String!
  }

  input UpdateCustomerInput {
    id: ID!
    initiated: Boolean
    complete: Boolean
  }

  input TransactionInput {
    fee: Int!
    price: Int!
    client_id: String!
    contract_id: String!
    customer_id: String!
  }

  type Mutation {
    createClient(input: ClientInput): Client!
    updateClient(input: UpdateClientInput): Boolean
    createContract(input: ContractInput): Contract!
    updateContract(input: UpdateContractInput): Boolean
    createCustomer(input: CustomerInput): Customer!
    updateCustomer(input: UpdateCustomerInput): Boolean
    createTransaction(input: TransactionInput): Transaction!
  }
`

const resolvers = {
  Client: {
    async contracts(client) {
      console.log(client.id)

      try {
        const contracts = await admin
          .firestore()
          .collection('contracts')
          .where('client_id', '==', client.id)
          .get()

        return contracts.docs.map(contract => {
          return { ...contract.data(), id: contract.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async customers(client: { id: any }) {
      try {
        const customers = await admin
          .firestore()
          .collection('customers')
          .where('client_id', '==', client.id)
          .get()

        return customers.docs.map(customer => {
          return { ...customer.data(), id: customer.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async transactions(client) {
      try {
        const transactions = await admin
          .firestore()
          .collection('transactions')
          .where('client_id', '==', client.id)
          .get()

        return transactions.docs.map(transaction => {
          return { ...transaction.data(), id: transaction.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },

  Contract: {
    async client(contract) {
      try {
        const client = await admin.firestore().collection('clients').doc(contract.client_id).get()
        return { ...client.data(), id: client.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async transactions(contract) {
      try {
        const transactions = await admin
          .firestore()
          .collection('transactions')
          .where('contract_id', '==', contract.id)
          .get()

        return transactions.docs.map(transaction => {
          return { ...transaction.data(), id: transaction.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async customers(contract) {
      try {
        const customers = await admin
          .firestore()
          .collection('customers')
          .where('contract_id', '==', contract.id)
          .get()

        return customers.docs.map(customer => {
          return { ...customer.data(), id: customer.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },

  Customer: {
    async client(customer) {
      try {
        const client = await admin.firestore().collection('clients').doc(customer.client_id).get()

        return { ...client.data(), id: client.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async contract(customer) {
      try {
        const contract = await admin
          .firestore()
          .collection('contracts')
          .doc(customer.contract_id)
          .get()

        return { ...contract.data(), id: contract.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async transactions(customer) {
      try {
        const transactions = await admin
          .firestore()
          .collection('transactions')
          .where('customer_id', '==', customer.id)
          .get()

        return transactions.docs.map(transaction => {
          return { ...transaction.data(), id: transaction.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },

  Transaction: {
    async client(transaction) {
      try {
        const client = await admin
          .firestore()
          .collection('clients')
          .doc(transaction.client_id)
          .get()

        return { ...client.data(), id: client.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async contract(transaction) {
      try {
        const contract = await admin
          .firestore()
          .collection('contracts')
          .doc(transaction.contract_id)
          .get()

        return { ...contract.data(), id: contract.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async customer(transaction) {
      try {
        const customer = await admin
          .firestore()
          .collection('customers')
          .doc(transaction.customer_id)
          .get()

        return { ...customer.data(), id: customer.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },

  Query: {
    async client(_, { id }) {
      try {
        const client = await admin.firestore().collection('clients').doc(id).get()

        return { ...client.data(), id: client.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async contracts(_, { client }) {
      try {
        const contracts = await admin
          .firestore()
          .collection('contracts')
          .where('client_id', '==', client)
          .get()
        return contracts.docs.map(contract => {
          return { ...contract.data(), id: contract.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async contract(_, { id }) {
      try {
        const contract = await admin.firestore().collection('contracts').doc(id).get()

        return { ...contract.data(), id: contract.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async customers(_, { id }) {
      try {
        let customers = await admin
          .firestore()
          .collection('customers')
          .where('client_id', '==', id)
          .get()
        if (customers.empty) {
          customers = await admin
            .firestore()
            .collection('customers')
            .where('contract_id', '==', id)
            .get()
        }
        return customers.docs.map(customer => {
          return { ...customer.data(), id: customer.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async customer(_, { id }) {
      try {
        const customer = await admin.firestore().collection('customers').doc(id).get()

        return { ...customer.data(), id: customer.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async transactions(_, { id }) {
      try {
        let transactions = await admin
          .firestore()
          .collection('transactions')
          .where('client_id', '==', id)
          .get()
        if (transactions.empty) {
          transactions = await admin
            .firestore()
            .collection('transactions')
            .where('contract_id', '==', id)
            .get()
        }
        return transactions.docs.map(transaction => {
          return { ...transaction.data(), id: transaction.id }
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async transaction(_, { id }) {
      try {
        const transaction = await admin.firestore().collection('transactions').doc(id).get()

        return { ...transaction.data(), id: transaction.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },

  context: async () => {
    a: 'a'
  },

  Mutation: {
    async createClient(_, { input: client }) {
      try {
        const write = await admin.firestore().collection('clients').add({
          name: client.name,
          phone: client.phone,
          email: client.email,
          website: client.website,
          birthday: client.birthday,
          description: client.description,
          timestamp: Date.now(),
        })
        return { ...(await write.get()).data(), id: write.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async updateClient(_, { input: client }) {
      try {
        await admin
          .firestore()
          .collection('clients')
          .doc(client.id)
          .update({
            ...client,
          })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async createContract(_, { input: contract }) {
      try {
        const write = await admin.firestore().collection('contracts').add({
          address: contract.address,
          mintPrice: contract.mintPrice,
          minted: contract.minted,
          name: contract.name,
          owner: contract.owner,
          supply: contract.supply,
          client_id: contract.client_id,
          timestamp: Date.now(),
        })
        return { ...(await write.get()).data(), id: write.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async updateContract(_, { input: contract }) {
      try {
        await admin
          .firestore()
          .collection('contracts')
          .doc(contract.id)
          .update({
            ...contract,
          })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async createCustomer(_, { input: customer }) {
      try {
        const write = await admin.firestore().collection('customers').add({
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          contract_id: customer.contract_id,
          client_id: customer.client_id,
          initiated: false,
          complete: false,
          timestamp: Date.now(),
        })
        return { ...(await write.get()).data(), id: write.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async updateCustomer(_, { input: customer }) {
      try {
        await admin
          .firestore()
          .collection('customers')
          .doc(customer.id)
          .update({
            ...customer,
          })
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    async createTransaction(_, { input: transaction }) {
      try {
        const write = await admin.firestore().collection('transactions').add({
          fee: transaction.fee,
          price: transaction.price,
          customer_id: transaction.customer_id,
          contract_id: transaction.contract_id,
          client_id: transaction.client_id,
          timestamp: Date.now(),
        })
        return { ...(await write.get()).data(), id: write.id }
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    
  }
})

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`)
})
