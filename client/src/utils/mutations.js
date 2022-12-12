import { gql } from '@apollo/client';

export const SIGNUP = gql`
	mutation SignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			_id
			email
			firstName
			lastName
		}
	}
`;

export const SIGNIN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			_id
			email
			firstName
			lastName
		}
	}
`;

export const UPLOAD = gql`
	mutation Upload($file: Upload!, $title: String!, $description: String, $author: String!) {
		uploadFile(file: $file, title: $title, description: $description, author: $author) {
			path
		}
	}
`;

export const LIKE = gql`
	mutation LikeImage($userId: ID!, $imageId: ID!, $status: Boolean) {
		likeImage(userId: $userId, imageId: $imageId, status: $status)
	}
`;
