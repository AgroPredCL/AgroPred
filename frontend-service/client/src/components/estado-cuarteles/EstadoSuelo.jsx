import React, { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

import {
	useGetStateNitrogenoQuery,
	useGetStatePotasioQuery,
	useGetStateFosforoQuery,
	useGetStatePHQuery,
	useGetStateHumedadQuery,
	useGetStateTemperaturaQuery,
	useGetStateConductividadQuery,
} from '@services/apiSliceModelos';

export default function EstadoSuelo({ cuartel }) {
	// Realizar todas las consultas con desestructuración de isLoading e isError
	const {
		data: nitrogeno = {},
		isLoading: isLoadingNitrogeno,
		isError: isErrorNitrogeno,
	} = useGetStateNitrogenoQuery(cuartel);
	const {
		data: potasio = {},
		isLoading: isLoadingPotasio,
		isError: isErrorPotasio,
	} = useGetStatePotasioQuery(cuartel);
	const {
		data: fosforo = {},
		isLoading: isLoadingFosforo,
		isError: isErrorFosforo,
	} = useGetStateFosforoQuery(cuartel);
	const {
		data: humedad = {},
		isLoading: isLoadingHumedad,
		isError: isErrorHumedad,
	} = useGetStateHumedadQuery(cuartel);
	const {
		data: conductividad = {},
		isLoading: isLoadingConductividad,
		isError: isErrorConductividad,
	} = useGetStateConductividadQuery(cuartel);
	const {
		data: temperatura = {},
		isLoading: isLoadingTemperatura,
		isError: isErrorTemperatura,
	} = useGetStateTemperaturaQuery(cuartel);
	const {
		data: ph = {},
		isLoading: isLoadingPH,
		isError: isErrorPH,
	} = useGetStatePHQuery(cuartel);

	// Lista de características
	const caracteristicas = [
		{
			titulo: 'Nitrógeno [mg/kg]',
			data: nitrogeno,
			isLoading: isLoadingNitrogeno,
			isError: isErrorNitrogeno,
		},
		{
			titulo: 'Potasio [mg/kg]',
			data: potasio,
			isLoading: isLoadingPotasio,
			isError: isErrorPotasio,
		},
		{
			titulo: 'Fósforo [mg/kg]',
			data: fosforo,
			isLoading: isLoadingFosforo,
			isError: isErrorFosforo,
		},
		{
			titulo: 'Humedad (%)',
			data: humedad,
			isLoading: isLoadingHumedad,
			isError: isErrorHumedad,
		},
		{
			titulo: 'Conductividad Eléctrica [mS/cm]',
			data: conductividad,
			isLoading: isLoadingConductividad,
			isError: isErrorConductividad,
		},
		{
			titulo: 'Temperatura [°C]',
			data: temperatura,
			isLoading: isLoadingTemperatura,
			isError: isErrorTemperatura,
		},
		{ titulo: 'pH', data: ph, isLoading: isLoadingPH, isError: isErrorPH },
	];

	// Mostrar mensaje de error general si alguna consulta falla
	if (
		[
			isErrorNitrogeno,
			isErrorPotasio,
			isErrorFosforo,
			isErrorHumedad,
			isErrorConductividad,
			isErrorTemperatura,
			isErrorPH,
		].some(isError => isError)
	) {
		return <p>Error al cargar los datos del suelo.</p>;
	}

	return (
		<>
			<div className='flex flex-wrap justify-center gap-2 py-4'>
				<Estado estado='Deficiente' />
				<Estado estado='Bajo' />
				<Estado estado='Adecuado' />
				<Estado estado='Alto' />
				<Estado estado='Excesivo' />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{caracteristicas.map(caracteristica => {
					if (caracteristica.isLoading) {
						return (
							<p key={caracteristica.titulo}>
								Cargando {caracteristica.titulo}...
							</p>
						);
					}
					return (
						<Caracteristica
							key={caracteristica.titulo}
							titulo={caracteristica.titulo}
							estadoActual={caracteristica.data?.estadoActual}
							valorActual={caracteristica.data?.valorActual}
							estadoPromedio={caracteristica.data?.estadoPromedio}
							valorPromedio={caracteristica.data?.valorPromedio}
						/>
					);
				})}
			</div>
		</>
	);
}

EstadoSuelo.propTypes = {
	cuartel: PropTypes.string.isRequired,
};

function Estado({ estado }) {
	const estadoStyles = {
		deficiente: 'bg-red-500',
		bajo: 'bg-yellow-500',
		adecuado: 'bg-green-500',
		alto: 'bg-blue-500',
		excesivo: 'bg-purple-500',
	};

	const bgColor = estadoStyles[estado.toLowerCase()] || 'bg-gray-300';

	return (
		<span className={`${bgColor} text-white text-sm px-2.5 py-0.5 rounded`}>
			{estado}
		</span>
	);
}

Estado.propTypes = {
	estado: PropTypes.string.isRequired,
};

function Caracteristica({
	titulo,
	estadoActual,
	valorActual,
	estadoPromedio,
	valorPromedio,
}) {
	return (
		<div className='bg-white shadow-md rounded-lg overflow-hidden mb-2'>
			<h2 className='text-lg font-semibold bg-gray-100 p-3 text-center'>
				{titulo}
			</h2>
			<Suspense fallback={<p className='text-center p-4'>Cargando...</p>}>
				<div className='p-4 space-y-4'>
					<div className='space-y-2'>
						<div className='flex items-center justify-between'>
							<p className='text-sm text-gray-600'>Valor Actual</p>
							<Estado estado={estadoActual} />
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>Medición:</span>
							<span className='font-medium'>{valorActual}</span>
						</div>
					</div>
					<div className='space-y-2'>
						<div className='flex items-center justify-between'>
							<p className='text-sm text-gray-600'>Promedio del periodo</p>
							<Estado estado={estadoPromedio} />
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-600'>Medición:</span>
							<span className='font-medium'>{valorPromedio}</span>
						</div>
					</div>
				</div>
			</Suspense>
			<div className='bg-gray-50 px-4 py-3 text-sm text-gray-500 flex items-center justify-end cursor-pointer hover:bg-gray-100 transition-colors'>
				Ver más
				<ChevronRight className='h-4 w-4 ml-1' />
			</div>
		</div>
	);
}

Caracteristica.propTypes = {
	titulo: PropTypes.string.isRequired,
	estadoActual: PropTypes.string.isRequired,
	valorActual: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	estadoPromedio: PropTypes.string.isRequired,
	valorPromedio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
};
