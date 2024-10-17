import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from '@pages/Home';
import EstadoCuarteles from '@pages/EstadoCuarteles';
import CreateCuartel from '@pages/CreateCuartel';
import Page404 from '@pages/Page404';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<Layout>
							<HomePage />
						</Layout>
					}
				/>
				<Route
					path='estado-cuarteles'
					element={
						<Layout>
							<EstadoCuarteles />
						</Layout>
					}
				/>
				<Route
					path='crear-cuartel'
					element={
						<Layout>
							<CreateCuartel />
						</Layout>
					}
				/>
				<Route
					path='*'
					element={
						<Layout>
							<Page404 />
						</Layout>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
