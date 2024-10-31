import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import PropTypes from 'prop-types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	annotationPlugin
);

const LineChart = ({ data, title, yAxisLabel }) => {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: data.length > 1,
				position: 'top',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					padding: 20,
					font: {
						size: 12,
						weight: 'bold',
					},
					color: '#4A5568',
				},
			},
			title: {
				display: true,
				text: title,
				font: {
					size: 18,
					weight: 'bold',
				},
				padding: {
					top: 10,
					bottom: 30,
				},
				color: '#2D3748',
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				backgroundColor: 'rgba(45, 55, 72, 0.9)',
				titleColor: '#FFFFFF',
				bodyColor: '#E2E8F0',
				titleFont: {
					size: 14,
					weight: 'bold',
				},
				bodyFont: {
					size: 12,
				},
				padding: 12,
				cornerRadius: 6,
				displayColors: false,
			},
			annotation: {
				annotations: {
					deshidratado: {
						type: 'box',
						yMin: 0,
						yMax: 69,
						backgroundColor: 'rgba(255, 64, 64, 0.25)',
						borderColor: 'rgba(255, 64, 64, 1)',
						borderWidth: 1,
						label: {
							display: true,
							content: 'Deshidratado',
							position: 'start',
							color: 'rgba(255, 64, 64, 1)',
						},
					},
					optimo: {
						type: 'box',
						yMin: 69,
						yMax: 100,
						backgroundColor: 'rgba(52, 211, 153, 0.25)',
						borderColor: 'rgba(52, 211, 153, 1)',
						borderWidth: 1,
						label: {
							display: true,
							content: 'Óptimo',
							position: 'center',
							color: 'rgba(52, 211, 153, 1)',
						},
					},
					sobrehidratado: {
						type: 'box',
						yMin: 100,
						yMax:
							Math.max(
								...data.flatMap(dataset =>
									dataset.data.map(entry => entry.valor)
								)
							) + 5,
						backgroundColor: 'rgba(64, 159, 255, 0.25)',
						borderColor: 'rgba(64, 159, 255, 1)',
						borderWidth: 1,
						label: {
							display: true,
							content: 'Sobrehidratado',
							position: 'end',
							color: 'rgba(64, 159, 255, 1)',
						},
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					maxTicksLimit: 8,
					maxRotation: 0,
					minRotation: 0,
					font: {
						size: 10,
					},
					color: '#4A5568',
				},
				grid: {
					display: true,
					color: 'rgba(226, 232, 240, 0.5)',
				},
			},
			y: {
				title: {
					display: true,
					text: yAxisLabel,
					font: {
						size: 12,
						weight: 'bold',
					},
					color: '#4A5568',
				},
				ticks: {
					font: {
						size: 10,
					},
					color: '#4A5568',
				},
				grid: {
					color: 'rgba(226, 232, 240, 0.5)',
				},
				suggestedMin:
					Math.min(
						...data.flatMap(dataset => dataset.data.map(entry => entry.valor))
					) - 5,
				suggestedMax:
					Math.max(
						...data.flatMap(dataset => dataset.data.map(entry => entry.valor))
					) + 5,
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
	};

	const labels = data[0].data.map(entry => {
		const date = new Date(entry.fecha); // Suponiendo que entry.fecha está en formato ISO
		return date.toLocaleDateString('es-ES'); // 'es-ES' para formato día-mes-año
	});

	const chartData = {
		labels,
		datasets: data.map(dataset => ({
			label: dataset.label,
			data: dataset.data.map(entry => entry.valor),
			borderColor: dataset.color || '#8A5D13',
			backgroundColor: dataset.color || '#8A5D13',
		})),
	};

	return (
		<div className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg'>
			<div className='flex flex-col md:flex-row'>
				<div
					className='w-full md:w-3/4 bg-white p-4 rounded-lg shadow-inner'
					style={{ height: '400px' }}
				>
					<Line options={options} data={chartData} />
				</div>
				<div className='w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 bg-white p-4 rounded-lg shadow-inner'>
					<h3 className='text-lg font-semibold text-gray-700 mb-4'>
						Leyenda de Hidratación
					</h3>
					<div className='flex flex-col space-y-4'>
						<div className='flex items-center'>
							<span className='w-4 h-4 mr-2 bg-red-400 rounded-sm'></span>
							<span className='text-sm text-gray-600'>
								Deshidratado: &lt; 69
							</span>
						</div>
						<div className='flex items-center'>
							<span className='w-4 h-4 mr-2 bg-green-400 rounded-sm'></span>
							<span className='text-sm text-gray-600'>Óptimo: 69 - 100</span>
						</div>
						<div className='flex items-center'>
							<span className='w-4 h-4 mr-2 bg-blue-400 rounded-sm'></span>
							<span className='text-sm text-gray-600'>
								Sobrehidratado: &gt; 100
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

LineChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			data: PropTypes.arrayOf(
				PropTypes.shape({
					fecha: PropTypes.string.isRequired,
					valor: PropTypes.number.isRequired,
				})
			).isRequired,
			color: PropTypes.string,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
	yAxisLabel: PropTypes.string,
};

LineChart.defaultProps = {
	yAxisLabel: 'Valor',
};

export default LineChart;
