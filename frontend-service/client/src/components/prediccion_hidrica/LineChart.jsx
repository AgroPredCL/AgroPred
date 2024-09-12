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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // No se necesita la leyenda para un solo dataset
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 14, // Máximo de 14 etiquetas
        }
      }
    }
  };

  // Extraer los labels (fechas) y los valores (data) de cada objeto en el array de data
  const labels = data.map(entry => entry.label); // Las fechas están en `label`
  const chartData = {
    labels,
    datasets: [{
      label: 'Valores', // Etiqueta para la serie de datos
      data: data.map(entry => entry.data), // Los valores están en `data`
      borderColor: data[0].color || '#8A5D13', // Color de la línea
      backgroundColor: data[0].color || '#8A5D13', // Color de fondo (relleno)
    }],
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
