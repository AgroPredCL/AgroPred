import React from 'react';
import ArticleHidrica from './ArticleHidrica';
import { useGetPredecirHidricoQuery } from '@services/apiSliceModelos';

const HydriclPredict = () => {
	// Función para manejar la solicitud de predicción
	const handlePredictionRequest = async () => {
		if (predictDays) {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/state/hidrico?cuartelID=3&cantidadDeDias=${predictDays}`
				);
				if (!response.ok) {
					throw new Error('Error al obtener datos de la API');
				}
				const predictionResult = await response.json();
				const prediccionResult = formatDataForChart(predictionResult);
				setPredictedData(prediccionResult);
			} catch (error) {
				console.error('Error en la solicitud:', error);
			}
		} else {
			console.log('Por favor, ingrese el número de días a predecir');
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
		console.log('originalData', originalData);
		console.log('predictedData', predictedData);
		return [
			...originalData.map(item => ({ fecha: item.fecha, valor: item.valor })),
			...predictedData.map(item => ({ fecha: item.fecha, valor: item.valor })),
		];
	};

	return (
		<div className='space-y-4 p-4'>
			<div className='space-y-4 p-4'>
				<div className='flex items-center space-x-4'>
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
						onChange={handleInputChange} //Aqui se llama a una funcion que esta mas arriba que se asegura que cuando se ingrese el numero se cumpla que sea mayor/gual a 1 y menor/igual a 14
						className='pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
					<button
						onClick={handlePredictionRequest}
						className='px-4 py-2 bg-pred text-white rounded-md hover:scale-105 transform transition-transform duration-300 ease-in-out'
					>
						Predecir
					</button>
				</div>
			</div>

			<div>
				<ArticleHidrica
					titulo='Estado Hídrico'
					data={[
						{ label: 'aguita', data: mergeData(data, predictedData || []) },
					]} // Formato para el gráfico
					titleChart='Agua Disponible [L] vs Tiempo [Día]'
				></ArticleHidrica>
			</div>
		</div>
	);
};

export default HydriclPredict;
