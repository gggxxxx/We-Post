import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
	return (
		<Container>
		<MenuBar/>
		<Routes>
			<Route path='/' element={<Navigate to='/signin' replace />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/home' element={<Home />} />
		</Routes>
		</Container>
	);
};

export default App;
