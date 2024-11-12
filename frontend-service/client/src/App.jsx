import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from '@pages/Home';
import EstadoCuarteles from '@pages/EstadoCuarteles';
import CreateCuartel from '@pages/CreateCuartel';
import RegisterRiego from '@pages/RegisterRiego';
import GestionRiego from '@pages/GestionRiego';
import GestionPersonal from '@pages/GestionPersonal';
import CreateUser from '@pages/CreateUser';
import CreateContratista from './pages/CreateContratista';
import Inventario from '@pages/Inventario';
import CreateProducto from '@pages/CreateProducto';
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
					path='registrar-riego/:cuartel'
					element={
						<Layout>
							<RegisterRiego />
						</Layout>
					}
				/>
				<Route
					path='uso-riego/:cuartel'
					element={
						<Layout>
							<GestionRiego />
						</Layout>
					}
				/>
				<Route
					path='gestion-personal'
					element={
						<Layout>
							<GestionPersonal />
						</Layout>
					}
				/>
				<Route
					path='crear-usuario'
					element={
						<Layout>
							<CreateUser />
						</Layout>
					}
				/>
				<Route
					path='Inventario'
					element={
						<Layout>
							<Inventario />
						</Layout>
					}
				/>
				<Route
					path='crear-contratista'
					element={
						<Layout>
							<CreateContratista />
						</Layout>
					}
				/>
				<Route
					path='agregar-producto'
					element={
						<Layout>
							<CreateProducto />
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
