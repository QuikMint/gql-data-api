import { ApolloError } from 'apollo-server'
import { Client } from '../Client/clientSchema'
import { Contract } from '../Contract/contractSchema'
import { Customer } from '../Customer/customerSchema'
import { Transaction } from './transactionSchema'

export const RTransaction = {
  async client(transaction) {
    try {
      return await Client.findById(transaction.client_id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async contract(transaction) {
    try {
      return await Contract.findById(transaction.contract_id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async customer(transaction) {
    try {
      return await Customer.findById(transaction.customer_id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const transactionQuery = {
  async transactions(_, { id }) {
    try {
      let transactions = await Transaction.find({ client_id: id })
      if (transactions.length === 0) {
        transactions = await Transaction.find({ contract_id: id })
      }
      return transactions
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async transaction(_, { id }) {
    try {
      return await Transaction.findById(id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const transactionMutation = {
  async createTransaction(_, { input: transaction }) {
    try {
      const transactionne = {
        fee: transaction.fee,
        price: transaction.price,
        customer_id: transaction.customer_id,
        contract_id: transaction.contract_id,
        client_id: transaction.client_id,
        start: Date.now(),
      }
      return await Transaction.create({ ...transactionne })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async finish(_, { id }) {
    return await (await Transaction.findByIdAndUpdate(id, { finish: Date.now() }, { new: true })).save()
  }
}
