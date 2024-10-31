import { useParams } from 'react-router-dom';
import { useGetUsoRiegoQuery } from '@services/apiSliceGestion';
import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

const GestionRiego = () => {
	const { cuartel } = useParams();
	const { data = [] } = useGetUsoRiegoQuery(cuartel);

	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState({});

	const handleEdit = item => {
		setEditingId(item.id);
		setEditData({
			fecha: item.fecha,
			hora: item.hora,
			litros_estimados: item.litros_estimados,
			observacion: item.observacion,
		});
	};

	const handleSave = () => {
		// Aquí iría la lógica para guardar los cambios
		console.log('Guardando cambios:', editData);
		setEditingId(null);
		setEditData({});
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditData({});
	};

	const handleChange = e => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	return (
		<div className='w-full max-w-6xl mx-auto'>
			<h1 className='text-2xl font-semibold text-gray-700 mb-4'>
				Gestión de Riego
			</h1>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Fecha
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Hora
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Litros Estimados
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Observación
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Tiempo de Riego
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Tipo de Riego
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Creado
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actualizado
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map(item => (
							<React.Fragment key={item.id}>
								<tr className={item.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
									<td className='px-4 py-2 whitespace-nowrap'>{item.fecha}</td>
									<td className='px-4 py-2 whitespace-nowrap'>{item.hora}</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{item.litros_estimados}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{item.observacion}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{item.tiempo_riego}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{item.tipo_riego}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{new Date(item.createdAt).toLocaleString()}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										{new Date(item.updatedAt).toLocaleString()}
									</td>
									<td className='px-4 py-2 whitespace-nowrap'>
										<button
											onClick={() => handleEdit(item)}
											className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										>
											<Edit className='w-4 h-4 mr-2' />
											Editar
										</button>
									</td>
								</tr>
								{editingId === item.id && (
									<tr>
										<td colSpan='9' className='px-4 py-2'>
											<div className='flex flex-wrap -mx-2'>
												<div className='w-full md:w-1/4 px-2 mb-4'>
													<label
														className='block text-gray-700 text-sm font-bold mb-2'
														htmlFor='fecha'
													>
														Fecha
													</label>
													<input
														className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														id='fecha'
														type='date'
														name='fecha'
														value={editData.fecha}
														onChange={handleChange}
													/>
												</div>
												<div className='w-full md:w-1/4 px-2 mb-4'>
													<label
														className='block text-gray-700 text-sm font-bold mb-2'
														htmlFor='hora'
													>
														Hora
													</label>
													<input
														className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														id='hora'
														type='time'
														name='hora'
														value={editData.hora}
														onChange={handleChange}
													/>
												</div>
												<div className='w-full md:w-1/4 px-2 mb-4'>
													<label
														className='block text-gray-700 text-sm font-bold mb-2'
														htmlFor='litros_estimados'
													>
														Litros Estimados
													</label>
													<input
														className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														id='litros_estimados'
														type='number'
														name='litros_estimados'
														value={editData.litros_estimados}
														onChange={handleChange}
													/>
												</div>
												<div className='w-full md:w-1/4 px-2 mb-4'>
													<label
														className='block text-gray-700 text-sm font-bold mb-2'
														htmlFor='observacion'
													>
														Observación
													</label>
													<input
														className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
														id='observacion'
														type='text'
														name='observacion'
														value={editData.observacion}
														onChange={handleChange}
													/>
												</div>
											</div>
											<div className='flex justify-end mt-4'>
												<button
													onClick={handleSave}
													className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2'
												>
													<Save className='w-4 h-4 mr-2' />
													Guardar
												</button>
												<button
													onClick={handleCancel}
													className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
												>
													<X className='w-4 h-4 mr-2' />
													Cancelar
												</button>
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default GestionRiego;
