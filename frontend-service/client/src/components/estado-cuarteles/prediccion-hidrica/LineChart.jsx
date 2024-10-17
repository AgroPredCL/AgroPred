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
  Filler, 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler 

);


const LineChart = ({ data, title }) => {
  /* const options = {
    responsive: false, // No redimensionar el gráfico automáticamente
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
  }; */

  // Convertir los datos de la API en arrays para usar en el gráfico
  console.log("data desde line",data)
  const labels = data[0].data.map(entry => `${entry.fecha}`);
  const values = data[0].data.map(entry => entry.valor); // Valores (los números asociados a las fechas)
  const value_max = Math.max(...values) +40; // Valor máximo + 20 para la escala
  console.log("labels:",labels)
  console.log("values:",values)

  // Crear arrays para las líneas de umbral (óptimo, déficit, superávit)
  const optimalLine = new Array(labels.length).fill(100); // Línea verde constante
  const deficitLine = new Array(labels.length).fill(69);  // Línea roja constante (límite inferior)
  const surplusLine = new Array(labels.length).fill(value_max); // Línea azul constante (límite superior)


  // Función personalizada para controlar qué datasets se pueden ocultar
  const handleLegendClick = (e, legendItem, legend) => {
    const datasetIndex = legendItem.datasetIndex;
    const datasets = legend.chart.data.datasets;

    // Evitar que ciertos datasets sean ocultados (por ejemplo: Óptimo, Déficit, Superávit)
    if (['Óptimo', 'Deshidratación', 'Sobrehidratación'].includes(datasets[datasetIndex].label)) {
      return; // No hacer nada si se hace clic en estos datasets
    }

    // Alternar la visibilidad del dataset clicado
    const ci = legend.chart;
    ci.getDatasetMeta(datasetIndex).hidden = !ci.getDatasetMeta(datasetIndex).hidden;
    ci.update();
  };
  const chartData = {
    labels, // Las fechas de los datos
    datasets: [
      {
        label: 'Agua Disponible',
        data: values, // Valores originales de la API
        borderColor: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: false, // No rellenar bajo la línea
        borderWidth: 2,
        pointRadius: 3,
        stepped: false, // Estilo escalonado para la línea
      },
      {
      label: 'Sobrehidratación',
      data: surplusLine, // Línea azul constante para el límite de superávit
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.1)', // Azul con transparencia
      borderWidth: 1,
      pointRadius: 0, // Sin puntos
      fill: '+1', // Rellenar hasta el siguiente dataset
    },
    {
      label: 'Óptimo',
      data: optimalLine, // Línea verde constante para los valores óptimos
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.1)', // Verde con transparencia
      borderWidth: 1,
      pointRadius: 0, // Sin puntos
      fill: '+1', // Rellenar hasta el siguiente dataset
    },
    {
      label: 'Deshidratación',
      data: deficitLine, // Línea roja constante para el límite de déficit
      borderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.1)', // Rojo con transparencia
      borderWidth: 1,
      pointRadius: 0, // Sin puntos
      fill: 'origin', // Rellenar hasta el origen (eje x)
    },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: true, // Permitir que el gráfico cambie de tamaño
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
        position: 'top',
        onClick: handleLegendClick, // Usar la función personalizada
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 14,
        },
      },
      y: {
        beginAtZero: true,
        max: value_max, // Escala máxima en Y, considerando valores altos
        min: 0,   // Escala mínima en Y
      },
    },
  };



  return <Line options={options} data={chartData} />;
};

export default LineChart;
