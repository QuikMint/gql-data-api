import mongoose from 'mongoose'

export const init = async () => {
	await mongoose.connect(process.env.MONGODB_URI)
}
