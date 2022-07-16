import mongoose from 'mongoose'
import { IContract } from 'quikmint'

const contractSchema = new mongoose.Schema<IContract>({
  address: { type: String, required: true },
  baseuri: { type: String, required: true },
  timestamp: { type: Number, required: true },
  mintPrice: { type: Number, required: true },
  minted: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  supply: { type: Number, required: true },
	client: {type: String, required: true}
})

contractSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const Contract = mongoose.model<IContract>('Contract', contractSchema)

export { Contract }
