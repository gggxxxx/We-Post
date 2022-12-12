import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new createUploadLink({
		uri: 'http://localhost:4000/graphqh',
		'Apollo-Require-Preflight': 'true',
		headers: {
			'Apollo-Require-Preflight': 'true'
		}
	})
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Router>
				<App />
			</Router>
		</ApolloProvider>
	</React.StrictMode>
);
