import React from 'react';
import { Pencil } from 'lucide-react';
import PropTypes from 'prop-types';
import { Seccion } from '@components/Seccion';
import { useGetUsuariosQuery } from '@services/apiSliceGestion';

export default function GestionPersonal() {
	const { data = [] } = useGetUsuariosQuery();

	const formatDate = dateString => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString('es-ES', options);
	};

	return (
		<Seccion titulo='Gestión de Personal'>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Nombre Completo
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								RUT
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Correo Electrónico
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Número de Teléfono
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Fecha de Creación
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Fecha de Actualización
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((user, index) => (
							<tr
								key={user.rut}
								className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
							>
								<td className='px-4 py-2 whitespace-nowrap'>
									{user.full_name}
								</td>
								<td className='px-4 py-2 whitespace-nowrap'>{user.rut}</td>
								<td className='px-4 py-2 whitespace-nowrap'>{user.email}</td>
								<td className='px-4 py-2 whitespace-nowrap'>
									{user.num_telefono}
								</td>
								<td className='px-4 py-2 whitespace-nowrap'>
									{formatDate(user.createdAt)}
								</td>
								<td className='px-4 py-2 whitespace-nowrap'>
									{formatDate(user.updatedAt)}
								</td>
								<td className='px-4 py-2 whitespace-nowrap'>
									<button className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
										<Pencil className='w-4 h-4 mr-2' />
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Seccion>
	);
}

GestionPersonal.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			full_name: PropTypes.string.isRequired,
			rut: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			num_telefono: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			updatedAt: PropTypes.string.isRequired,
		})
	).isRequired,
};
