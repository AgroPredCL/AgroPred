import React, { useState } from 'react';
import { CustomButton } from '@components/UI';
import { Pencil } from 'lucide-react';
import { usePutCuartelMutation } from '@services/apiSliceGestion';
import PropTypes from 'prop-types';

const CuartelSection = ({ title, details, isEditing, editData, onChange }) => {
	return (
		<div className='flex flex-col items-center md:items-start'>
			<h4 className='text-lg font-semibold mb-2 text-center md:text-left'>
				{title}
			</h4>
			{details.map((detail, index) => (
				<div key={index} className='text-center md:text-left leading-loose'>
					<span className='font-medium'>{detail.label}:</span>{' '}
					{isEditing ? (
						<input
							type='text'
							name={detail.key}
							value={editData[detail.key] || ''}
							onChange={onChange}
							className='border-b border-gray-400 focus:outline-none focus:border-b-2'
						/>
					) : (
						detail.value
					)}
				</div>
			))}
		</div>
	);
};

CuartelSection.propTypes = {
	title: PropTypes.string.isRequired,
	details: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			key: PropTypes.string.isRequired,
		})
	).isRequired,
	isEditing: PropTypes.bool,
	editData: PropTypes.object,
	onChange: PropTypes.func,
};

export default function RenderCuartelDetails(cuartel) {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({ ...cuartel });
	const [putCuartel] = usePutCuartelMutation();

	const plantacionDetails = [
		{ label: 'Área', value: `${cuartel.area} m²`, key: 'area' },
		{
			label: 'Cantidad de paltos',
			value: cuartel.cant_paltos,
			key: 'cant_paltos',
		},
		{ label: 'Tipo de planta', value: cuartel.tipo_planta, key: 'tipo_planta' },
		{
			label: 'Marco de plantación',
			value: `${cuartel.marco_plantacion} m`,
			key: 'marco_plantacion',
		},
	];

	const riegoDetails = [
		{
			label: 'Caudal emisor',
			value: `${cuartel.caudal_emisor} L/h`,
			key: 'caudal_emisor',
		},
		{
			label: 'Coeficiente de uniformidad',
			value: cuartel.coeficiente_uniformidad,
			key: 'coeficiente_uniformidad',
		},
		{
			label: 'Eficiencia de riego',
			value: cuartel.eficiencia_riego,
			key: 'eficiencia_riego',
		},
		{
			label: 'Factor área sombreada',
			value: cuartel.factor_area_sombreada,
			key: 'factor_area_sombreada',
		},
		{
			label: 'Número de emisores por planta',
			value: cuartel.numero_emisores_planta,
			key: 'numero_emisores_planta',
		},
		{
			label: 'Umbral de riego',
			value: cuartel.umbral_riego,
			key: 'umbral_riego',
		},
	];

	const sueloDetails = [
		{
			label: 'Piedras en perfil de suelo',
			value: `${cuartel.piedras_perfil_suelo * 100}%`,
			key: 'piedras_perfil_suelo',
		},
		{
			label: 'Porcentaje de suelo con emisores',
			value: `${cuartel.porcentaje_suelo_emisores * 100}%`,
			key: 'porcentaje_suelo_emisores',
		},
		{
			label: 'Profundidad de raíces',
			value: `${cuartel.profundidad_raices} m`,
			key: 'profundidad_raices',
		},
		{
			label: 'Retención de agua en suelo',
			value: cuartel.retencion_agua_suelo,
			key: 'retencion_agua_suelo',
		},
	];

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		const { nombre_Cuartel, ...dataToSend } = editData;
		console.log('Cuartel editado:', nombre_Cuartel); // Verifica qué datos estás enviando
		console.log('Datos enviados:', dataToSend); // Verifica qué datos estás enviando

		try {
			await putCuartel({
				cuartel: cuartel.nombre_Cuartel,
				changes: dataToSend, // Solo los datos editados
			}).unwrap();
			setIsEditing(false);
			console.log('Cuartel actualizado con éxito');
			window.location.reload(); // Recarga la página
		} catch (err) {
			console.error('Error al actualizar el cuartel:', err);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setEditData(prevData => ({ ...prevData, [name]: value }));
	};

	if (cuartel.nombre_Cuartel === 'Vista General') {
		return (
			<div>
				<h3 className='text-xl font-semibold mb-4'>Vista General</h3>
				<p className='mb-4'>
					Aquí puedes ver un resumen general de todos los cuarteles o alguna
					otra información.
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 pb-4'>
				<div className='flex flex-col items-center md:items-start md:col-span-2 lg:col-span-3'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
						<CuartelSection
							title='Detalles de plantación'
							details={plantacionDetails}
							isEditing={isEditing}
							editData={editData}
							onChange={handleChange}
						/>
						<CuartelSection
							title='Detalles de riego'
							details={riegoDetails}
							isEditing={isEditing}
							editData={editData}
							onChange={handleChange}
						/>
						<CuartelSection
							title='Detalles del suelo'
							details={sueloDetails}
							isEditing={isEditing}
							editData={editData}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='flex justify-center md:justify-end md:items-start'>
					{isEditing ? (
						<CustomButton onClick={handleSave} className='flex items-center'>
							Guardar
						</CustomButton>
					) : (
						<CustomButton
							onClick={handleEditClick}
							className='flex items-center'
						>
							<Pencil className='h-4 w-4 mr-2' />
							Editar Cuartel
						</CustomButton>
					)}
				</div>
			</div>
		</div>
	);
}
