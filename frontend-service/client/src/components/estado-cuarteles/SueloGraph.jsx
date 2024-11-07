import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArticleNutritional } from './estado-nutricional/ArticleNutritional';
import { CustomButton } from '@components/UI';
import Tab from '@components/Tab';
import {
	useGetStateConRangoQuery,
	useGetPredecirNPKQuery,
} from '@services/apiSliceModelos';

export default function SueloGraph({ cuartel }) {
	const [dateRange, setDateRange] = useState({
		start: '2023-01-01',
		end: '2023-01-31',
	});
	const [predictDays, setPredictDays] = useState('');
	const [predictedData, setPredictedData] = useState(null);
	const [activeTab, setActiveTab] = useState('NPK');

	const {
		data,
		error: stateError,
		isLoading: stateLoading,
	} = useGetStateConRangoQuery({
		start_date: dateRange.start,
		end_date: dateRange.end,
		cuartel: cuartel,
	});

	const handlePredictionRequest = async () => {
		if (predictDays) {
			try {
				const predictionData = await useGetPredecirNPKQuery({
					dia: predictDays,
					cuartel: cuartel,
				}).unwrap();
				const combinedData = {
					nitrogeno: {
						original: data?.nitrogeno || [],
						predicciones: predictionData?.nitrogeno?.predicciones || [],
					},
					fosforo: {
						original: data?.fosforo || [],
						predicciones: predictionData?.fosforo?.predicciones || [],
					},
					potasio: {
						original: data?.potasio || [],
						predicciones: predictionData?.potasio?.predicciones || [],
					},
				};
				setPredictedData(combinedData);
			} catch (error) {
				console.error('Error al realizar la predicción:', error);
			}
		} else {
			console.log('Por favor, ingrese el número de días a predecir');
		}
	};

	const handleInputChange = e => {
		const value = e.target.value;
		if (value === '' || (Number(value) >= 1 && Number(value) <= 14)) {
			setPredictDays(value);
		}
	};

	const mergeData = (originalData = [], predictedData = []) => {
		return [
			...originalData.map(item => ({ fecha: item.fecha, valor: item.valor })),
			...predictedData.map(item => ({ fecha: item.fecha, valor: item.valor })),
		];
	};

	if (stateLoading) return <div className='text-center py-4'>Cargando...</div>;
	if (stateError)
		return (
			<div className='text-center py-4 text-red-500'>
				Error al cargar los datos: {stateError.message}
			</div>
		);

	const tabs = [
		{ id: 'NPK', label: 'NPK' },
		{ id: 'Temperatura', label: 'Temperatura' },
		{ id: 'pH', label: 'pH' },
		{ id: 'Conductividad', label: 'Conductividad Eléctrica' },
		{ id: 'Humedad', label: 'Humedad' },
	];

	console.log("Fecha inicio:",dateRange.start,"Fecha fin:",dateRange.end)

	return (
		<div className='space-y-6'>
			<div className='flex flex-wrap gap-4 mb-4'>
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
			</div>

			<div className='flex  border-b border-gray-200'>
				{tabs.map(tab => (
					<Tab
						key={tab.id}
						label={tab.label}
						active={activeTab === tab.id}
						onClick={() => setActiveTab(tab.id)}
					/>
				))}
			</div>

			<div className='bg-white'>
				{activeTab === 'NPK' && (
					<ArticleNutritional
						titulo='Nitrógeno - Fósforo - Potasio (NPK)'
						data={[
							{
								label: 'Nitrógeno',
								data: mergeData(
									data?.nitrogeno,
									predictedData?.nitrogeno?.predicciones
								),
								color: 'rgba(255, 99, 132, 1)',
							},
							{
								label: 'Fósforo',
								data: mergeData(
									data?.fosforo,
									predictedData?.fosforo?.predicciones
								),
								color: 'rgba(255, 206, 86, 1)',
							},
							{
								label: 'Potasio',
								data: mergeData(
									data?.potasio,
									predictedData?.potasio?.predicciones
								),
								color: 'rgba(54, 162, 235, 1)',
							},
						]}
						titleChart='NPK [mg/kg] vs Tiempo [Día]'
					>
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
							<CustomButton onClick={handlePredictionRequest}>
								Predecir
							</CustomButton>
						</div>
					</ArticleNutritional>
				)}

				{activeTab === 'Temperatura' && (
					<ArticleNutritional
						titulo='Temperatura'
						data={[{ label: 'Temperatura [°C]', data: data?.temperatura }]}
						titleChart='Temperatura [°C] vs Tiempo [día]'
					/>
				)}

				{activeTab === 'pH' && (
					<ArticleNutritional
						titulo='pH'
						data={[{ label: 'pH', data: data?.ph }]}
						titleChart='pH vs Tiempo [día]'
					/>
				)}

				{activeTab === 'Conductividad' && (
					<ArticleNutritional
						titulo='Conductividad Eléctrica'
						data={[
							{ label: 'Conductividad eléctrica', data: data?.conductividad },
						]}
						titleChart='Conductividad Eléctrica [mS/cm] vs Tiempo [día]'
					/>
				)}

				{activeTab === 'Humedad' && (
					<ArticleNutritional
						titulo='Humedad'
						data={[{ label: 'Humedad', data: data?.humedad }]}
						titleChart='Humedad (%) vs Tiempo [día]'
					/>
				)}
			</div>
		</div>
	);
}

SueloGraph.propTypes = {
	cuartel: PropTypes.string.isRequired,
};
