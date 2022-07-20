"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_1 = require("./graphql");
require('dotenv').config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: graphql_1.resolvers,
    csrfPrevention: true,
    context: async () => { },
});
mongoose_1.default.connect(process.env.MONGODB_URI);
const db = mongoose_1.default.connection;
db.on('error', () => process.exit(1));
db.once('open', () => {
    console.log('connected to mongodb');
    server
        .listen({
        port: 3000,
    })
        .then(({ url }) => {
        console.log(`Listening at ${url}`);
    });
});
//# sourceMappingURL=index.js.map