import typeDefs from './types.js';
import resolvers from './resolvers.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import fs from 'fs';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(graphqlUploadExpress());
app.use(
	'/graphqh',
	cors(),
	bodyParser.json({ limit: '50mb' }),
	expressMiddleware(server, {
		context: async ({ req }) => ({ token: req.headers.token })
	})
);
app.use('/images/:fileName', (req, res) => {
	const { fileName } = req.params;
	fs.readFile(`./images/${fileName}`, (err, data) => {
		!err && res.send(data);
	});
});

await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
