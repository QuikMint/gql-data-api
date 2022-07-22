import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import { typeDefs, resolvers } from './graphql'
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: async () => {},
})
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', (e) => {
  console.error(e)
  process.exit(1)
})
db.once('open', () => {
  console.log('connected to mongodb')
  server
    .listen({
      port: 3000,
    })
    .then(({ url }) => {
      console.log(`Listening at ${url}`)
    })
})
