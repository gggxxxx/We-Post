import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNIN } from '../utils/mutations';

const Login = () => {
	const [signIn] = useMutation(SIGNIN);
	const navigate = useNavigate();

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		signIn({
			variables: {
				email: data.get('email'),
				password: data.get('password')
			}
		}).then(res => {
			sessionStorage.setItem('accountInfo', JSON.stringify(res.data.signIn));
			navigate('/home');
		});
	};

	return (
		<Grid container component='main' sx={{ height: '50vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(https://source.unsplash.com/random)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOpenIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Login
						</Button>
						<Stack direction='row'>
							<Link component={RouterLink} to='/register' variant='body2' sx={{ ml: 'auto' }}>
								{"Don't have an account? Register"}
							</Link>
						</Stack>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
