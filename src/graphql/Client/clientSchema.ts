import mongoose from 'mongoose'
import { IClient } from 'quikmint'

const clientSchema = new mongoose.Schema<IClient>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
	email: { type: String, required: true },
  website: { type: String, required: true },
  admin: Boolean,
  birthday: { type: String, required: true },
  description: { type: String, required: true },
	timestamp: { type: Number, required: true }
})

clientSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Client = mongoose.model<IClient>('Client', clientSchema)