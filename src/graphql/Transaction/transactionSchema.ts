import mongoose from 'mongoose'
import { ITransaction } from '../utils'

const transactionSchema = new mongoose.Schema<ITransaction>({
  start: { type: Number, required: true },
  finish: { type: Number },
  fee: { type: Number, required: true },
  price: { type: Number, required: true },
  client_id: { type: String, required: true },
  contract_id: { type: String, required: true },
  customer_id: { type: String, required: true },
})

transactionSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export { Transaction }
