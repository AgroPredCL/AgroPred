import React from 'react';
import { CustomButton } from '@components/UI';
import { Pencil } from 'lucide-react';

import PropTypes from 'prop-types';

const CuartelSection = ({ title, details }) => {
	return (
		<div className='flex flex-col items-center md:items-start'>
			<h4 className='text-lg font-semibold mb-2 text-center md:text-left'>
				{title}
			</h4>
			{details.map((detail, index) => (
				<p key={index} className='text-center md:text-left leading-loose'>
					<span className='font-medium'>{detail.label}:</span> {detail.value}
				</p>
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
		})
	).isRequired,
};

export function renderCuartelDetails(cuartel, handleEdit) {
	const plantacionDetails = [
		{ label: 'Área', value: `${cuartel.area} m²` },
		{ label: 'Cantidad de paltos', value: cuartel.cant_paltos },
		{ label: 'Tipo de planta', value: cuartel.tipo_planta },
		{ label: 'Marco de plantación', value: `${cuartel.marco_plantacion} m` },
	];

	const riegoDetails = [
		{ label: 'Caudal emisor', value: `${cuartel.caudal_emisor} L/h` },
		{
			label: 'Coeficiente de uniformidad',
			value: cuartel.coeficiente_uniformidad,
		},
		{ label: 'Eficiencia de riego', value: cuartel.eficiencia_riego },
		{ label: 'Factor área sombreada', value: cuartel.factor_area_sombreada },
		{
			label: 'Número de emisores por planta',
			value: cuartel.numero_emisores_planta,
		},
		{ label: 'Umbral de riego', value: cuartel.umbral_riego },
	];

	const sueloDetails = [
		{
			label: 'Piedras en perfil de suelo',
			value: `${cuartel.piedras_perfil_suelo * 100}%`,
		},
		{
			label: 'Porcentaje de suelo con emisores',
			value: `${cuartel.porcentaje_suelo_emisores * 100}%`,
		},
		{
			label: 'Profundidad de raíces',
			value: `${cuartel.profundidad_raices} m`,
		},
		{
			label: 'Retención de agua en suelo',
			value: cuartel.retencion_agua_suelo,
		},
	];

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
						/>
						<CuartelSection title='Detalles de riego' details={riegoDetails} />
						<CuartelSection title='Detalles del suelo' details={sueloDetails} />
					</div>
				</div>
				<div className='flex justify-center md:justify-end md:items-start'>
					<CustomButton onClick={handleEdit} className='flex items-center'>
						<Pencil className='h-4 w-4 mr-2' />
						Editar Cuartel
					</CustomButton>
				</div>
			</div>
		</div>
	);
}
