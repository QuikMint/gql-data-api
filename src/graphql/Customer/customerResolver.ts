import { ApolloError } from 'apollo-server'
import { Client } from '../Client/clientSchema'
import { Contract } from '../Contract/contractSchema'
import { Transaction } from '../Transaction/transactionSchema'
import { Customer } from './customerSchema'

export const RCustomer = {
  async client(customer) {
    try {
      return await Client.findById(customer.id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async contract(customer) {
    try {
      return await Contract.findById(customer.contract_id)
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async transactions(customer) {
    try {
      return await Transaction.find({customer_id: customer.id})
    } catch (error) {
      throw new ApolloError(error)
    }
  },
}

export const customerQuery = {
  async customers(_, { id }) {
    try {
        let customers = await Customer.find({client_id: id})
      if (customers.length === 0) {
        customers = await Customer.find({contract_id: id})
      }
      return customers
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async customer(_, { id }) {
    try {
      return await Customer.findById(id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}

export const customerMutation = {
  async createCustomer(_, { input: customer }) {
    try {
      const customero = {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        contract_id: customer.contract_id,
        client_id: customer.client_id,
        initiated: false,
        complete: false,
        timestamp: Date.now(),
      }
      return await Customer.create({ ...customero })
    } catch (error) {
      throw new ApolloError(error)
    }
  },
  async updateCustomer(_, { input: customer }) {
    try {
      return await Customer.findByIdAndUpdate(customer.id, { ...customer })
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}