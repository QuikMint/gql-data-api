import mongoose from 'mongoose'
import { ITransaction } from 'quikmint'

const transactionSchema = new mongoose.Schema<ITransaction>({
  start: {type: Number, required: true},
	finish: {type: Number, required: true},
	fee: {type: Number, required: true},
	price: {type: Number, required: true},
  client: { type: String, required: true },
  contract: { type: String, required: true },
  customer: { type: String, required: true }
})

transactionSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export { Transaction }
