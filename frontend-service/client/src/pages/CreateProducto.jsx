import React, { useState } from 'react';
import { CustomButton, CustomInput } from '@components/UI';
import validateForm from '@interceptors/ValidateForm';
import formFields from '@contexts/CreateProducto';
import FieldTypeIndicator from '@components/forms/FieldTypeIndicator';
import {
	usePostProductoMutation,
	useGetInventariosQuery,
	useGetTagsQuery,
	usePostTagMutation,
} from '@services/apiSliceGestion';

function CreateProducto() {
	const [formData, setFormData] = useState(
		formFields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {
			tags: [],
		})
	);
	const [errors, setErrors] = useState({});
	const [newTag, setNewTag] = useState(''); // Estado para el nuevo tag
	const [showTagModal, setShowTagModal] = useState(false); // Modal para crear tag
	const { data: inventarios = [] } = useGetInventariosQuery(); // Obtener categorías
	const { data: tags = [] } = useGetTagsQuery(); // Obtener tags
	const [postProducto, { isLoading, isError, isSuccess }] =
		usePostProductoMutation();
	const [postTag] = usePostTagMutation();

	const handleChange = e => {
		const { name, value, type } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
		}));
	};

	// Manejar cambio en selección múltiple de tags
	const handleTagSelection = e => {
		const selectedTag = e.target.value;
		setFormData(prevData => {
			const newTags = prevData.tags.includes(selectedTag)
				? prevData.tags.filter(tag => tag !== selectedTag)
				: [...prevData.tags, selectedTag];
			return { ...prevData, tags: newTags };
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const { isValid, newErrors } = validateForm(formData, formFields);
		setErrors(newErrors);

		if (isValid) {
			try {
				await postProducto(formData).unwrap();
				console.log('Producto creado con éxito');
			} catch (err) {
				console.error('Error al crear el Producto:', err);
			}
		} else {
			console.log('Hay errores en el formulario');
		}
	};

	// Crear un nuevo tag
	const handleCreateTag = async () => {
		if (newTag.trim()) {
			try {
				await postTag({ tag_nombre: newTag }).unwrap();
				setNewTag('');
				setShowTagModal(false);
			} catch (error) {
				console.error('Error al crear el Tag:', error);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 bg-white p-6 rounded-lg shadow-md'
		>
			<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
				Añadir Producto
			</h2>
			<p className='text-gray-600 mb-4'>
				Todos los campos deben ser completados para añadir un Producto con
				éxito.
				<span className='block mt-2'>
					<FieldTypeIndicator type='number' /> indica un campo numérico,
					<FieldTypeIndicator type='text' /> indica un campo de texto.
				</span>
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{formFields.map(field => (
					<div key={field.id}>
						<CustomInput
							id={field.id}
							label={
								<>
									{field.label}
									<FieldTypeIndicator type={field.type} />
								</>
							}
							type={field.type}
							value={formData[field.id]}
							onChange={handleChange}
							placeholder={`Ingrese ${
								field.type === 'number' ? 'un valor' : 'el texto'
							}`}
						/>
						{errors[field.id] && (
							<p className='text-red-600 text-sm mt-1'>{errors[field.id]}</p>
						)}
					</div>
				))}
				{/* Dropdown para seleccionar categoría */}
				<div>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Categoría
					</label>
					<select
						name='categoria'
						value={formData.categoria || ''}
						onChange={handleChange}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Seleccione una categoría</option>
						{inventarios.map(inventario => (
							<option key={inventario.id} value={inventario.categoria}>
								{inventario.categoria}
							</option>
						))}
					</select>
					{errors.categoria && (
						<p className='text-red-600 text-sm mt-1'>{errors.categoria}</p>
					)}
				</div>

				{/* Selección múltiple de Tags */}
				<div>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Tags
					</label>
					<div className='flex flex-wrap gap-2'>
						{tags.map(tag => (
							<div key={tag.tag_id} className='flex items-center'>
								<input
									type='checkbox'
									id={`tag-${tag.tag_id}`}
									value={tag.tag_id}
									checked={formData.tags.includes(tag.tag_id)}
									onChange={handleTagSelection}
									className='mr-2'
								/>
								<label htmlFor={`tag-${tag.tag_id}`} className='text-gray-700'>
									{tag.tag_nombre}
								</label>
							</div>
						))}
					</div>
					<CustomButton type='button' onClick={() => setShowTagModal(true)}>
						Agregar nuevo Tag
					</CustomButton>
				</div>
			</div>
			<CustomButton
				type='submit'
				className='w-full md:w-auto'
				disabled={isLoading}
			>
				{isLoading ? 'Guardando...' : 'Guardar Parámetros'}
			</CustomButton>

			{isSuccess && (
				<p className='text-green-600 mt-4'>Producto creado con éxito</p>
			)}
			{isError && (
				<p className='text-red-600 mt-4'>Hubo un error al crear el Producto</p>
			)}

			{/* Modal para agregar un nuevo tag */}
			{showTagModal && (
				<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
					<div className='bg-white p-4 rounded shadow-lg w-1/3'>
						<h3 className='text-lg font-semibold mb-4'>Agregar nuevo Tag</h3>
						<input
							type='text'
							value={newTag}
							onChange={e => setNewTag(e.target.value)}
							placeholder='Ingrese nombre del Tag'
							className='w-full mb-4 p-2 border rounded'
						/>
						<div className='flex justify-end'>
							<CustomButton onClick={handleCreateTag}>Guardar Tag</CustomButton>
							<CustomButton onClick={() => setShowTagModal(false)}>
								Cancelar
							</CustomButton>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}

export default CreateProducto;
