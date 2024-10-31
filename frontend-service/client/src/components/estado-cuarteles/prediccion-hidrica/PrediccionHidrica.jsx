import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from '@components/UI';
import {
	useGetPredecirHidricoQuery,
	useGetStateConRangoQuery,
} from '@services/apiSliceModelos';
import LineChart from './LineChart';
import { Droplets } from 'lucide-react';

export default function HydriclPredict({ cuartel }) {
	const [dateRange, setDateRange] = useState({
		start: '2023-01-01',
		end: '2023-01-05',
	});
	const [predictDays, setPredictDays] = useState('');
	const [predictedData, setPredictedData] = useState(null);
	const [lastDay, setLastDay] = useState('');
	const [lastValue, setLastValue] = useState(-1);

	const {
		data,
		error: stateError,
		isLoading: stateLoading,
	} = useGetStateConRangoQuery({
		start_date: dateRange.start,
		end_date: dateRange.end,
		cuartel: cuartel,
	});

	const { data: predictionData } = useGetPredecirHidricoQuery(
		{
			dia: predictDays,
			cuartel: cuartel,
		},
		{
			skip: !predictDays || !cuartel, // Solo ejecutar si los valores son válidos
		}
	);

	const handlePredictionRequest = () => {
		if (predictDays) {
			if (predictionData) {
				// Obtener las claves del objeto y acceder a la última
				const lastKey = Object.keys(predictionData).pop();
				console.log('Última clave:', lastKey); // "d"
				setLastDay(lastKey);
				// Obtener el valor asociado a la última clave
				const lastValue = predictionData[lastKey];
				console.log('Último valor:', lastValue); // 40
				setLastValue(lastValue);

				const newpredictionData = formatDataForChart(predictionData);
				console.log('Prediccion data', newpredictionData);
				setPredictedData(newpredictionData); // Usa los datos obtenidos
			}
		} else {
			console.log('Por favor, ingrese el número de días a predecir');
			alert('Por favor, ingrese un número entre 1 y 14'); //Luego cambiar por un pequeño mensaje en pantalla que indique el valor
		}
	};

	const handleInputChange = e => {
		const value = e.target.value;
		if (value === '' || (Number(value) >= 1 && Number(value) <= 14)) {
			setPredictDays(value);
		} else {
			alert('Por favor, ingrese un número entre 1 y 14'); //Luego cambiar por un pequeño mensaje en pantalla que indique el valor
		}
	};

	// Transformar los datos en el formato adecuado para el gráfico
	const formatDataForChart = apiData => {
		return Object.entries(apiData).map(([fecha, valor]) => ({
			fecha: fecha, // Fecha como etiqueta
			valor: valor, // Valor correspondiente a la fecha
		}));
	};

	const mergeData = (originalData, predictedData) => {
		return [
			...originalData.map(item => ({ fecha: item.fecha, valor: item.valor })),
			...predictedData.map(item => ({ fecha: item.fecha, valor: item.valor })),
		];
	};

	// Definir el mensaje de recomendación basado en el último valor
	let recomendacion = '';
	if (lastValue >= 70 && lastValue <= 100) {
		recomendacion = `En la fecha ${lastDay} no hay necesidad de regar`;
	} else if (lastValue == -1) {
		recomendacion = `No hay recomendaciones`;
	} else if (lastValue < 70) {
		recomendacion = `En la fecha ${lastDay} se recomienda regar el cuartel`;
	} else if (lastValue > 100) {
		recomendacion = `En la fecha ${lastDay} hay exceso de agua`;
	}

	if (stateLoading) return <div className='text-center py-4'>Cargando...</div>;
	if (stateError)
		return (
			<div className='text-center py-4 text-red-500'>
				Error al cargar los datos: {stateError.message}
			</div>
		);

	return (
		<div className='space-y-4 p-4'>
			<div className='flex items-center justify-between gap-4 mb-4'>
				<div className='flex items-center space-x-2'>
					<label
						htmlFor='start-date'
						className='text-sm font-medium text-gray-700 w-24'
					>
						Fecha Inicio
					</label>
					<input
						type='date'
						id='start-date'
						value={dateRange.start}
						onChange={e =>
							setDateRange(prev => ({ ...prev, start: e.target.value }))
						}
						className='w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div className='flex items-center space-x-2'>
					<label
						htmlFor='end-date'
						className='text-sm font-medium text-gray-700 w-24'
					>
						Fecha Fin
					</label>
					<input
						type='date'
						id='end-date'
						value={dateRange.end}
						onChange={e =>
							setDateRange(prev => ({ ...prev, end: e.target.value }))
						}
						className='w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div className='flex-grow'></div> {/* Espaciador */}
				<a href={`/registrar-riego/${cuartel}`}>
					<CustomButton type='submit' className='flex items-center'>
						<Droplets className='w-5 h-5 mr-2' />
						Registrar Riego
					</CustomButton>
				</a>
			</div>

			<div className='flex items-center space-x-4 mt-4 mb-4'>
				<label
					htmlFor='predict-date'
					className='block text-sm font-medium text-gray-700'
				>
					Días a predecir
				</label>
				<input
					type='number'
					id='predict-date'
					min='1'
					max='14'
					value={predictDays}
					onChange={handleInputChange}
					className='w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
				/>
				<CustomButton onClick={handlePredictionRequest}>Predecir</CustomButton>

				{/* Contenedor del botón alineado a la derecha */}
				<div className='ml-auto'>
					<a href={`/uso-riego/${cuartel}`}>
						<CustomButton type='submit' className='flex items-center'>
							<Droplets className='w-5 h-5 mr-2' />
							Ver Registros de Riego
						</CustomButton>
					</a>
				</div>
			</div>

			<div>
				<LineChart
					title='Agua Disponible [L] vs Tiempo [Día]'
					data={[
						{
							label: 'Agua disponible',
							data: mergeData(data?.humedad, predictedData || []),
						},
					]} // Formato para el gráfico
				/>
			</div>

			<article className='mt-6 pt-2 border-t-2'>
				<h2 className='text-xl font-semibold text-gray-700 mb-4'>
					Recomendaciones de riego
				</h2>
				<div className='flex justify-between flex-wrap'>
					<div className='w-full md:w-1/3 lg:w-1/4 p-2'>
						<div className='p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow h-full '>
							<p className='text-gray-600 mt-2'>{recomendacion}</p>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
HydriclPredict.propTypes = {
	cuartel: PropTypes.string.isRequired,
};
