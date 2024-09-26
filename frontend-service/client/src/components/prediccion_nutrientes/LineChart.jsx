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
  scales,
  Ticks,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: data.length > 1, // Muestra la leyenda solo si hay más de un dataset
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 14,
        }
      }
    }
  };

  const labels = data[0].data.map(entry => `${entry.fecha}`);

  const chartData = {
    labels,
    datasets: data.map((data, index) => ({
      label: data.label,
      data: data.data.map(entry => entry.valor),
      borderColor: data.color || `#8A5D13`,
      backgroundColor: data.color || `#8A5D13`,
    })),
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;