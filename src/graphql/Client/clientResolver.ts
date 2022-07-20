
import { Client } from './clientSchema'
import { ApolloError } from 'apollo-server'
import { Kind, GraphQLScalarType } from 'graphql'
import { Contract } from '../Contract/contractSchema'
import { Customer } from '../Customer/customerSchema'
import { Transaction } from '../Transaction/transactionSchema'


export const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value: string | number | Date) => {
      return new Date(value) // value from the client
    },
    serialize: (value: Date) => {
      return value.getTime() // value sent to the client
    },
    parseLiteral: (ast) => {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null
    }
  })
}

export const RClient = {
  // get all contracts where ID === client
  async contracts(client) {
    try {
      return await Contract.find({ client_id: client.id })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async customers(client: { id: any }) {
    try {
      return await Customer.find({ client_id: client.id })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async transactions(client) {
    try {
      return await Transaction.find({ client_id: client.id })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const clientQuery = {
  async client(_, { id }) {
    try {
      return await Client.findById(id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}

export const clientMutation = {
  async createClient(_, { input: client }) {
    try {
      const cliente = {
        name: client.name,
        phone: client.phone,
        email: client.email,
        website: client.website,
        birthday: client.birthday,
        description: client.description,
        timestamp: Date.now()
      }
      return await Client.create({ ...cliente })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async updateClient(_, { input: client }) {
    try {
      return await Client.findByIdAndUpdate(client.id, { ...client })
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}

