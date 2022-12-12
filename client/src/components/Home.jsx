import React from 'react';
import { Container, ImageList, Box, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '../utils/queries';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Upload from './Upload';
import { useMutation } from '@apollo/client';
import { LIKE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
	const [likeImage] = useMutation(LIKE);
	const userInfo = JSON.parse(sessionStorage.getItem('accountInfo'));
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate('/signin');
		}
	}, []);

	const { data, loading, refetch } = useQuery(GET_IMAGES, {
		variables: { id: userInfo?._id },
		fetchPolicy: 'network-only'
	});

	const likeEffect = (imageId, status, index) => {
		likeImage({ variables: { userId: userInfo?._id, imageId, status } }).then(() => {
			data.imageList[index].like = status;
		});
	};


	return (
		<>
			<Container maxWidth='lg'>
				 
				<div style={{display: 'flex', justifyContent: 'center'}}>
  					<br/>
					<h1 style={{color:'darkseagreen'}}>Recent Posts</h1>
					<br/>
				</div>
				{loading ? (
					'loading...'
				) : (
					<Box sx={{ maxWidth:'100%', height: 1100, overflowY: 'scroll' }}>
					<ImageList variant="masonry" cols={2}>
						{data.imageList.map((item, index) => (
							<ImageListItem key={item._id}>
								<img
									src={`${item.url}?w=248&fit=crop&auto=format`}
									srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.title}
									loading='lazy'
								/>
								<ImageListItemBar
									sx={{
										background:
											'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
									}}
									title={item.title}
									position = "top"
									actionIcon={
										<IconButton
											sx={{ color: item.like ? 'red' : 'white' }}
											aria-label={`heart ${item.title}`}
											onClick={() => likeEffect(item._id, !item.like, index)}
										>
											{item.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
										</IconButton>
									}
									actionPosition='right'
								/>

								<ImageListItemBar
									title={`by: @${item?.author}`}
									subtitle={item.description ?? <span>{item.description}</span>}
									position='below'
								/>
							</ImageListItem>
						))}
					</ImageList>
					</Box>
				)}
			</Container>
			<Upload refetch={refetch} />
		</>
	);
};

export default Home;
