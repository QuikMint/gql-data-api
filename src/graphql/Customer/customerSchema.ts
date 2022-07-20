import mongoose from 'mongoose'
import { ICustomer } from '../utils'

const customerSchema = new mongoose.Schema<ICustomer>({
  initiated: { type: Boolean, required: true,  },
  complete: { type: Boolean, required: true },
  timestamp: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  client_id: { type: String, required: true },
  contract_id: { type: String, required: true },
})

customerSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Customer = mongoose.model<ICustomer>('Customer', customerSchema)

export { Customer }
