import React, { useState } from 'react';
import { Seccion } from '@components/Seccion';
import { CustomButton } from '@components/UI';
import { ArchiveRestore, Edit, Trash2, Save, X } from 'lucide-react';
import Tab from '@components/Tab';
import {
	useGetInventariosQuery,
	useGetProductosQuery,
	usePutProductoMutation,
	useDeleteProductoMutation,
} from '@services/apiSliceGestion';

export default function Inventario() {
	const { data: inventarios, isLoading: inventariosLoading } =
		useGetInventariosQuery();
	const {
		data: productos,
		isLoading: productosLoading,
		refetch,
	} = useGetProductosQuery();
	const [putProducto] = usePutProductoMutation();
	const [deleteProducto] = useDeleteProductoMutation();
	const [activeTab, setActiveTab] = useState('Todos');
	const [editingId, setEditingId] = useState(null);
	const [editedData, setEditedData] = useState({});

	if (inventariosLoading || productosLoading)
		return <p>Cargando inventarios y productos...</p>;

	const productosFiltrados =
		activeTab === 'Todos'
			? productos
			: productos?.filter(
					producto => producto.categoria === inventarios[activeTab].categoria
				);

	const handleEdit = producto => {
		setEditingId(producto.id);
		setEditedData({ ...producto });
	};

	const handleSave = async () => {
		try {
			const originalProduct = productos.find(p => p.id === editingId);
			const changes = {};
			Object.keys(editedData).forEach(key => {
				if (editedData[key] !== originalProduct[key]) {
					changes[key] = editedData[key];
				}
			});

			if (Object.keys(changes).length > 0) {
				await putProducto({ id: editingId, changes }).unwrap();
				setEditingId(null);
				refetch();
			} else {
				console.log('No se realizaron cambios');
				setEditingId(null);
			}
		} catch (error) {
			console.error('Error al actualizar producto:', error);
		}
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditedData({});
	};

	const handleDelete = async productoId => {
		if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
			try {
				await deleteProducto(productoId).unwrap();
				refetch();
			} catch (error) {
				console.error('Error al eliminar producto:', error);
			}
		}
	};

	const handleInputChange = (e, field) => {
		const value =
			field === 'cantidad' ? parseInt(e.target.value, 10) : e.target.value;
		setEditedData({ ...editedData, [field]: value });
	};

	return (
		<Seccion titulo='Inventario'>
			<a href='agregar-producto'>
				<CustomButton type='submit' className='flex items-center mt-2 mb-4'>
					<ArchiveRestore className='w-5 h-5 mr-2' />
					Agregar producto
				</CustomButton>
			</a>

			<div role='tablist' className='flex mb-4'>
				<Tab
					label='Todos'
					active={activeTab === 'Todos'}
					onClick={() => setActiveTab('Todos')}
				/>
				{inventarios?.map((inventario, index) => (
					<Tab
						key={index}
						label={inventario.categoria}
						active={activeTab === index}
						onClick={() => setActiveTab(index)}
					/>
				))}
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='px-4 py-2'>Nombre</th>
							<th className='px-4 py-2'>Descripción</th>
							<th className='px-4 py-2'>Cantidad</th>
							<th className='px-4 py-2'>Ubicación</th>
							<th className='px-4 py-2'>Estado</th>
							<th className='px-4 py-2'>Creado</th>
							<th className='px-4 py-2'>Actualizado</th>
							<th className='px-4 py-2'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{productosFiltrados?.map((producto, index) => (
							<tr
								key={producto.id}
								className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
							>
								<td className='px-4 py-2'>
									{editingId === producto.id ? (
										<input
											type='text'
											value={editedData.nombre || ''}
											onChange={e => handleInputChange(e, 'nombre')}
											className='w-full px-2 py-1 border rounded'
										/>
									) : (
										producto.nombre
									)}
								</td>
								<td className='px-4 py-2'>
									{editingId === producto.id ? (
										<input
											type='text'
											value={editedData.descripcion || ''}
											onChange={e => handleInputChange(e, 'descripcion')}
											className='w-full px-2 py-1 border rounded'
										/>
									) : (
										producto.descripcion
									)}
								</td>
								<td className='px-4 py-2'>
									{editingId === producto.id ? (
										<input
											type='number'
											value={editedData.cantidad || ''}
											onChange={e => handleInputChange(e, 'cantidad')}
											className='w-full px-2 py-1 border rounded'
										/>
									) : (
										producto.cantidad
									)}
								</td>
								<td className='px-4 py-2'>
									{editingId === producto.id ? (
										<input
											type='text'
											value={editedData.ubicacion || ''}
											onChange={e => handleInputChange(e, 'ubicacion')}
											className='w-full px-2 py-1 border rounded'
										/>
									) : (
										producto.ubicacion
									)}
								</td>
								<td className='px-4 py-2'>
									{editingId === producto.id ? (
										<select
											value={editedData.estado || ''}
											onChange={e => handleInputChange(e, 'estado')}
											className='w-full px-2 py-1 border rounded'
										>
											<option value='Sin stock'>Sin stock</option>
											<option value='En espera de reposición'>
												En espera de reposición
											</option>
											<option value='Disponible'>Disponible</option>
										</select>
									) : (
										producto.estado
									)}
								</td>
								<td className='px-4 py-2'>
									{new Date(producto.createdAt).toLocaleDateString()}
								</td>
								<td className='px-4 py-2'>
									{new Date(producto.updatedAt).toLocaleDateString()}
								</td>
								<td className='px-4 py-2'>
									<div className='flex space-x-2'>
										{editingId === producto.id ? (
											<>
												<button
													onClick={handleSave}
													className='flex items-center justify-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md'
												>
													<Save className='w-4 h-4 mr-2' />
													Guardar
												</button>
												<button
													onClick={handleCancel}
													className='flex items-center justify-center px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md'
												>
													<X className='w-4 h-4 mr-2' />
													Cancelar
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => handleEdit(producto)}
													className='flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md'
												>
													<Edit className='w-4 h-4 mr-2' />
													Editar
												</button>
												<button
													onClick={() => handleDelete(producto.id)}
													className='flex items-center justify-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md'
												>
													<Trash2 className='w-4 h-4 mr-2' />
													Eliminar
												</button>
											</>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Seccion>
	);
}
