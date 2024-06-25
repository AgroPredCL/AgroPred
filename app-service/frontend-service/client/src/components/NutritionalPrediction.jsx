import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NutritionalPrediction = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Nitrógeno',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1, // Asegúrate de tener esta opción para suavizar las líneas
      },
      {
        label: 'Fósforo',
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Potasio',
        data: [18, 48, 77, 9, 100, 27],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Predicción Estado Nutricional',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className='text-blue-500'>Predicción Estado Nutricional</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default NutritionalPrediction;
