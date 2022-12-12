import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
	query ImageList($id: ID!) {
		imageList(id: $id) {
			_id
			url
			title
			description
			author
			like
		}
	}
`;
