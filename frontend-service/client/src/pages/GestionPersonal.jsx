import React, { useState } from 'react';
import { Edit, Save, X, UserPlus, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { Seccion } from '@components/Seccion';
import { CustomButton } from '@components/UI';
import {
	useGetUsuariosQuery,
	usePutUsuarioMutation,
	useDeleteUsuarioMutation,
} from '@services/apiSliceGestion';

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

const EditableRow = ({ user, onSave, onCancel }) => {
	const [editData, setEditData] = useState({
		full_name: user.full_name,
		num_telefono: user.num_telefono,
		email: user.email,
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setEditData(prev => ({ ...prev, [name]: value }));
	};

	return (
		<tr>
			<td colSpan='8' className='px-4 py-2'>
				<div className='flex flex-wrap -mx-2'>
					{['full_name', 'email', 'num_telefono'].map(field => (
						<div key={field} className='w-full md:w-1/3 px-2 mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor={field}
							>
								{field === 'full_name'
									? 'Nombre Completo'
									: field === 'email'
										? 'Correo Electrónico'
										: 'Número de Teléfono'}
							</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id={field}
								type={
									field === 'email'
										? 'email'
										: field === 'num_telefono'
											? 'tel'
											: 'text'
								}
								name={field}
								value={editData[field]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>
				<div className='flex justify-end mt-4'>
					<button
						onClick={() => onSave(editData)}
						className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2'
					>
						<Save className='w-4 h-4 mr-2' />
						Guardar
					</button>
					<button
						onClick={onCancel}
						className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
					>
						<X className='w-4 h-4 mr-2' />
						Cancelar
					</button>
				</div>
			</td>
		</tr>
	);
};

EditableRow.propTypes = {
	user: PropTypes.shape({
		full_name: PropTypes.string.isRequired,
		num_telefono: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default function GestionPersonal() {
	const { data: users = [], refetch } = useGetUsuariosQuery();
	const [updateUsuario] = usePutUsuarioMutation();
	const [deleteUsuario] = useDeleteUsuarioMutation();
	const [editingId, setEditingId] = useState(null);

	const handleEdit = user => {
		setEditingId(user.rut);
	};

	const handleSave = async editedData => {
		try {
			await updateUsuario({ rut: editingId, ...editedData });
			setEditingId(null);
			await refetch();
			window.location.reload();
		} catch (error) {
			console.error('Error al actualizar usuario:', error);
		}
	};

	const handleCancel = () => {
		setEditingId(null);
	};

	const handleDelete = async rut => {
		if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
			try {
				await deleteUsuario(rut);
				await refetch();
				window.location.reload();
			} catch (error) {
				console.error('Error al eliminar usuario:', error);
			}
		}
	};

	return (
		<Seccion titulo='Gestión de Personal'>
			<a href='crear-usuario'>
				<CustomButton type='submit' className='flex items-center mt-2 mb-4'>
					<UserPlus className='w-5 h-5 mr-2' />
					Crear Usuario
				</CustomButton>
			</a>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							{[
								'Nombre Completo',
								'RUT',
								'Correo Electrónico',
								'Número de Teléfono',
								'Fecha de Creación',
								'Fecha de Actualización',
								'Acciones',
							].map(header => (
								<th
									key={header}
									className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<React.Fragment key={user.rut}>
								<tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
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
										<div className='flex space-x-2'>
											<button
												onClick={() => handleEdit(user)}
												className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
											>
												<Edit className='w-4 h-4 mr-2' />
												Editar
											</button>
											<button
												onClick={() => handleDelete(user.rut)}
												className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
											>
												<Trash2 className='w-4 h-4 mr-2' />
												Eliminar
											</button>
										</div>
									</td>
								</tr>
								{editingId === user.rut && (
									<EditableRow
										user={user}
										onSave={handleSave}
										onCancel={handleCancel}
									/>
								)}
							</React.Fragment>
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
