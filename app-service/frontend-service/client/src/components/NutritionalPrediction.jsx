import React, { useState } from 'react';

import { Content } from './prediccion_nutrientes/Content';

const NutritionalPrediction = () => {
  // Estado local para el período, vista y secciones colapsables
  const [period, setPeriod] = useState({ start: 'Enero', end: 'Marzo' });
  const [view, setView] = useState('graph'); // 'graph' or 'table'


  // Meses y cálculo de índices de inicio y fin del período
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  const currentMonthIndex = new Date().getMonth();
  const startIdx = months.indexOf(period.start);
  const endIdx = months.indexOf(period.end);
  const labels = months.slice(startIdx, endIdx + 1);

  // Generación de datos de ejemplo para el período seleccionado
  const getDataForPeriod = (startIdx, endIdx) => {
    const weeks = Array.from({ length: (endIdx - startIdx + 1) * 4 }, (_, i) => `Semana ${i + 1}`);

    const newData = {
      labels: weeks,
      datasets: [
        {
          label: 'Nitrógeno',
          data: Array.from({ length: weeks.length }, () => Math.floor(Math.random() * 10) + 25),
          fill: false,
          borderColor: '#95C11F',
          tension: 0.1,
        },
        {
          label: 'Fósforo',
          data: Array.from({ length: weeks.length }, () => Math.floor(Math.random() * 10) + 20),
          fill: false,
          borderColor: '#023E8A',
          tension: 0.1,
        },
        {
          label: 'Potasio',
          data: Array.from({ length: weeks.length }, () => Math.floor(Math.random() * 10) + 30),
          fill: false,
          borderColor: '#FF0303',
          tension: 0.1,
        },
      ],
    };

    return newData;
  };

  // Manejar cambios en el período seleccionado
  const handlePeriodChange = (e) => {
    const { name, value } = e.target;
    const newPeriod = { ...period, [name]: value };

    const startIdx = months.indexOf(newPeriod.start);
    const endIdx = months.indexOf(newPeriod.end);

    if (endIdx - startIdx <= 2) {
      setPeriod(newPeriod);
      const newData = getDataForPeriod(startIdx, endIdx);
      setData(newData);
    } else {
      alert('El período seleccionado debe ser de un máximo de 3 meses.');
    }
  };

  // Estado local para los datos y opciones de gráfico
  const [data, setData] = useState(getDataForPeriod(startIdx, endIdx));

  // Función para cambiar entre vista de gráfico y tabla
  const toggleView = (viewType) => {
    setView(viewType);
  };


  return (
    <div className="overflow-y-auto">
      <Content titulo='NPK' tituloGrafico='Nutrientes [mg/kg] vs Tiempo [meses]' />
      <Content titulo='Temperatura' tituloGrafico='Temperatura [°C] vs Tiempo [meses]' />
      <Content titulo='PH' tituloGrafico='PH vs Tiempo [meses]' />
      <Content titulo='Conductividad Eléctrica' tituloGrafico='Conductividad Eléctrica [mS/cm] vs Tiempo [meses]' />
      <Content titulo='Humedad' tituloGrafico='Humedad (%) vs Tiempo [meses]' />
    </div>
  );
};

export default NutritionalPrediction;
