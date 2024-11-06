import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ErrorPage from './pages/error'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <HomePage/>,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},			
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
