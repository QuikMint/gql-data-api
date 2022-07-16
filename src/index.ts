import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './graphql'
import { init } from './graphql/utils/connection'

init()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: async () => {},
})

server.listen({
  port: 3000
}).then(({ url }) => {
  console.log(`Listening at ${url}`)
})
