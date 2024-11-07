import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import PropTypes from 'prop-types';

const EditableProductoRow = ({ producto, onSave, onCancel }) => {
	const [editData, setEditData] = useState({
		nombre: producto.nombre,
		descripcion: producto.descripcion,
		cantidad: producto.cantidad,
		ubicacion: producto.ubicacion,
		estado: producto.estado,
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setEditData(prev => ({ ...prev, [name]: value }));
	};

	return (
		<tr>
			<td colSpan={8} className='px-4 py-2'>
				<div className='flex flex-wrap -mx-2'>
					{['nombre', 'descripcion', 'cantidad', 'ubicacion', 'estado'].map(
						field => (
							<div key={field} className='w-full md:w-1/3 px-2 mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor={field}
								>
									{field.charAt(0).toUpperCase() + field.slice(1)}
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id={field}
									type='text'
									name={field}
									value={editData[field]}
									onChange={handleChange}
								/>
							</div>
						)
					)}
				</div>
				<div className='flex justify-end mt-4'>
					<button
						onClick={() => onSave(editData, producto)}
						className='px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md mr-2'
					>
						<Save className='w-4 h-4 mr-2' />
						Guardar
					</button>
					<button
						onClick={onCancel}
						className='px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md'
					>
						<X className='w-4 h-4 mr-2' />
						Cancelar
					</button>
				</div>
			</td>
		</tr>
	);
};

EditableProductoRow.propTypes = {
	producto: PropTypes.shape({
		nombre: PropTypes.string.isRequired,
		descripcion: PropTypes.string.isRequired,
		cantidad: PropTypes.number.isRequired,
		ubicacion: PropTypes.string.isRequired,
		estado: PropTypes.string.isRequired,
	}).isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default EditableProductoRow;
