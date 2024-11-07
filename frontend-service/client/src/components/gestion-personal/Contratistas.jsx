import React, { useState } from 'react';
import { Edit, Save, X, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import Tab from '@components/Tab';
import {
	useGetContratistasQuery,
	usePutContratistasMutation,
} from '@services/apiSliceGestion';
import PropTypes from 'prop-types';

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

const EditableRow = ({ contratista, onSave, onCancel }) => {
	const [editData, setEditData] = useState({
		nombre: contratista.nombre,
		apellido_paterno: contratista.apellido_paterno,
		apellido_materno: contratista.apellido_materno,
		num_telefono: contratista.num_telefono,
		email: contratista.email,
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setEditData(prev => ({ ...prev, [name]: value }));
	};

	return (
		<tr>
			<td colSpan={8} className='px-4 py-2'>
				{/* Input fields for editable row */}
				<div className='flex flex-wrap -mx-2'>
					{[
						'nombre',
						'apellido_paterno',
						'apellido_materno',
						'email',
						'num_telefono',
					].map(field => (
						<div key={field} className='w-full md:w-1/3 px-2 mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor={field}
							>
								{field === 'nombre'
									? 'Nombre'
									: field === 'apellido_paterno'
										? 'Apellido Paterno'
										: field === 'apellido_materno'
											? 'Apellido Materno'
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
				{/* Save and Cancel buttons */}
				<div className='flex justify-end mt-4'>
					<button
						onClick={() => onSave(editData, contratista)}
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
	contratista: PropTypes.shape({
		nombre: PropTypes.string.isRequired,
		apellido_paterno: PropTypes.string.isRequired,
		apellido_materno: PropTypes.string.isRequired,
		num_telefono: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default function Contratistas() {
	const { data: contratistas = [], refetch } = useGetContratistasQuery();
	const [updateContratista] = usePutContratistasMutation();
	const [editingId, setEditingId] = useState(null);
	const [activeTab, setActiveTab] = useState('activos');

	const handleEdit = contratista => {
		setEditingId(contratista.rut);
	};

	const handleSave = async (editedData, contratista) => {
		const changes = {};
		Object.keys(editedData).forEach(key => {
			if (editedData[key] !== contratista[key]) {
				changes[key] = editedData[key];
			}
		});

		try {
			if (Object.keys(changes).length > 0) {
				await updateContratista({ rut: editingId, changes });
				setEditingId(null);
				await refetch();
			} else {
				console.log('No se realizaron cambios');
				setEditingId(null);
			}
		} catch (error) {
			console.error('Error al actualizar contratista:', error);
		}
	};

	const handleCancel = () => {
		setEditingId(null);
	};

	const handleToggleStatus = async contratista => {
		try {
			const changes = { estado: !contratista.estado };
			await updateContratista({ rut: contratista.rut, changes });
			await refetch();
		} catch (error) {
			console.error('Error al cambiar el estado del contratista:', error);
		}
	};

	const handleDelete = contratista => {
		// Lógica para eliminar contratista
		console.log('Eliminar contratista:', contratista);
	};

	const filteredContratistas = contratistas.filter(contratista =>
		activeTab === 'activos' ? contratista.estado : !contratista.estado
	);

	return (
		<>
			<div className='mb-4'>
				<Tab
					label='Contratistas Activos'
					active={activeTab === 'activos'}
					onClick={() => setActiveTab('activos')}
				/>
				<Tab
					label='Contratistas Inactivos'
					active={activeTab === 'inactivos'}
					onClick={() => setActiveTab('inactivos')}
				/>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							{[
								'Nombre Completo',
								'RUT',
								'Correo Electrónico',
								'Número de Teléfono',
								'Empresa',
								'Teléfono de Empresa',
								'Correo de Empresa',
								'Descripción',
								'Empleados',
								'Fecha de Contrato',
								'Costo',
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
						{filteredContratistas.map((contratista, index) => (
							<React.Fragment key={contratista.rut}>
								<tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
									<td className='px-4 py-2 whitespace-nowrap'>{`${contratista.nombre} ${contratista.apellido_paterno} ${contratista.apellido_materno}`}</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.rut}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.email}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.num_telefono}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.nom_empresa}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.num_telefono_empresa}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.email_empresa}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.descripcion}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{contratista.cant_empleados}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{formatDate(contratista.fecha_contrato)}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>{`$${contratista.costo.toLocaleString()}`}</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										<div className='flex space-x-2'>
											<button
												onClick={() => handleEdit(contratista)}
												className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
											>
												<Edit className='w-4 h-4 mr-2' />
												Editar
											</button>
											<button
												onClick={() => handleToggleStatus(contratista)}
												className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'
											>
												{contratista.estado ? (
													<ToggleLeft className='h-4 mr-2' />
												) : (
													<ToggleRight className='h-4 mr-2' />
												)}
												{contratista.estado ? 'Deshabilitar' : 'Habilitar'}
											</button>
											<button
												onClick={() => handleDelete(contratista)}
												className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
											>
												<Trash2 className='w-4 h-4 mr-2' />
												Eliminar
											</button>
										</div>
									</td>
								</tr>
								{editingId === contratista.rut && (
									<EditableRow
										contratista={contratista}
										onSave={handleSave}
										onCancel={handleCancel}
									/>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
