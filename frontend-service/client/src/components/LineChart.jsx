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
import PropTypes from 'prop-types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
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
					color: '#4A5568', // Texto de la leyenda en gris oscuro
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
				color: '#2D3748', // Título en gris muy oscuro
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				backgroundColor: 'rgba(45, 55, 72, 0.9)', // Fondo del tooltip en gris oscuro
				titleColor: '#FFFFFF', // Texto del título en blanco
				bodyColor: '#E2E8F0', // Texto del cuerpo en gris claro
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
					color: '#4A5568', // Color del texto del eje X
				},
				grid: {
					display: true,
					color: 'rgba(226, 232, 240, 0.5)', // Líneas de cuadrícula más suaves
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: yAxisLabel,
					font: {
						size: 12,
						weight: 'bold',
					},
					color: '#4A5568', // Color del título del eje Y
				},
				ticks: {
					font: {
						size: 10,
					},
					color: '#4A5568', // Color del texto del eje Y
				},
				grid: {
					color: 'rgba(226, 232, 240, 0.5)', // Líneas de cuadrícula más suaves
				},
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
	};

	const labels = data[0].data.map(entry => `${entry.fecha}`);

	const chartData = {
		labels,
		datasets: data.map(data => ({
			label: data.label,
			data: data.data.map(entry => entry.valor),
			borderColor: data.color || `#8A5D13`,
			backgroundColor: data.color || `#8A5D13`,
		})),
	};

	return (
		<div className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg'>
			<div
				className='bg-white p-4 rounded-lg shadow-inner'
				style={{ height: '400px' }}
			>
				<Line options={options} data={chartData} />
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
