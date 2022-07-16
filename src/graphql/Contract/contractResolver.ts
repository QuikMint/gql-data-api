import { ApolloError } from 'apollo-server'
import { Client } from '../Client/clientSchema'
import { Customer } from '../Customer/customerSchema'
import { Transaction } from '../Transaction/transactionSchema'
import { Contract } from './contractSchema'

export const RContract = {
  async client(contract) {
    try {
      return await Client.findById(contract.client_id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async transactions(contract) {
    try {
      return await Transaction.find({ contract_id: contract.id })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async customers(contract) {
    try {
      return await Customer.find({ contract_id: contract.id })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const contractQuery = {
  async contracts(_, { clientId }) {
    try {
      return await Contract.find({ client_id: clientId })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async contract(_, { id }) {
    try {
      return await Contract.findById(id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const contractMutation = {
  async createContract(_, { input: contract }) {
    try {
      const contracto = {
        address: contract.address,
        mintPrice: contract.mintPrice,
        minted: contract.minted,
        name: contract.name,
        owner: contract.owner,
        supply: contract.supply,
        client_id: contract.client_id,
        timestamp: Date.now(),
      }
      return await Contract.create({ ...contracto })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async updateContract(_, { input: contract }) {
    try {
      return await Contract.findByIdAndUpdate(contract.id, { ...contract })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}
