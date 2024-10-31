import React, { useState } from 'react';
import { CustomButton, CustomInput } from '@components/UI';
import validateForm from '@interceptors/ValidateForm';
import formFields from '@contexts/RegisterRiego';
import FieldTypeIndicator from '@components/forms/FieldTypeIndicator';
import { usePostRiegoMutation } from '@services/apiSliceGestion';
import { useParams } from 'react-router-dom';

function RegisterRiego() {
	const { cuartel } = useParams();
	const [formData, setFormData] = useState(
		formFields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
	);
	const [errors, setErrors] = useState({});
	const [postRiego, { isLoading, isError, isSuccess }] = usePostRiegoMutation(); // Hook para la mutación

	const handleChange = e => {
		const { name, value, type } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const { isValid, newErrors } = validateForm(formData, formFields);
		setErrors(newErrors);

		if (isValid) {
			try {
				const formDataWithCuartel = { ...formData, cuartel_ID: cuartel }; // Agregar cuartelID
				console.log('formDataWithCuartel:', formDataWithCuartel);
				await postRiego(formDataWithCuartel).unwrap(); // Enviar los datos del formulario
				console.log('Riego registrado con éxito');
			} catch (err) {
				console.error('Error al registrar el Riego:', err);
			}
		} else {
			console.log('Hay errores en el formulario');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 bg-white p-6 rounded-lg shadow-md'
		>
			<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
				Registrar Riego
			</h2>
			<p className='text-gray-600 mb-4'>
				Todos los campos deben ser completados para añadir un cuartel con éxito.
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
			</div>
			<CustomButton
				type='submit'
				className='w-full md:w-auto'
				disabled={isLoading}
			>
				{isLoading ? 'Guardando...' : 'Guardar Parámetros'}
			</CustomButton>

			{isSuccess && (
				<p className='text-green-600 mt-4'>Riego registrado con éxito</p>
			)}
			{isError && (
				<p className='text-red-600 mt-4'>Hubo un error al registrar el riego</p>
			)}
		</form>
	);
}

export default RegisterRiego;
