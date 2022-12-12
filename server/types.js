export default `#graphql
	scalar Upload

	type Query {
		imageList(id: ID!): [ImagePost]
	}

	type Mutation {
		signUp(email: String!, password: String!, firstName: String!, lastName: String!): User
		signIn(email: String!, password: String!): User
		uploadFile(file: Upload!, title: String!, description: String, author: String!): File!
		likeImage(userId: ID!, imageId: ID!, status: Boolean): String
	}

	type User {
		_id: ID!
		email: String!
		firstName: String!
		lastName: String!
	}

	type ImagePost {
		_id: ID!
		title: String!
		description: String
		author: String!
		url: String!
		like: Boolean!
	}

	type File {
		path: String!
	}
`;
