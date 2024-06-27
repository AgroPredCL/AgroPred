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

  // Estado local para los datos de gráfico
  const [data, setData] = useState({
    labels: [],
    datasets: [
      { label: 'Nitrógeno', data: [], fill: false, borderColor: '#95C11F', tension: 0.1 },
      { label: 'Fósforo', data: [], fill: false, borderColor: '#023E8A', tension: 0.1 },
      { label: 'Potasio', data: [], fill: false, borderColor: '#FF0303', tension: 0.1 },
    ],
  });

  // Función para obtener los datos de predicción según el número de días a predecir
  const getPredictionData = async (daysToPredict) => {
    try {
      const result = await fetchData(`/prediction/NPK?diasAPredecir=${daysToPredict}`);
      console.log("Resultado de la API de predicción:", result);

      // Actualizar los datos del estado con las nuevas predicciones
      const newData = {
        labels: result.nitrogeno.predicciones.map(item => item.fecha),
        datasets: [
          {
            label: 'Nitrógeno',
            data: result.nitrogeno.predicciones.map(item => item.valor),
            fill: false,
            borderColor: '#95C11F',
            tension: 0.1,
          },
          {
            label: 'Fósforo',
            data: result.fosforo.predicciones.map(item => item.valor),
            fill: false,
            borderColor: '#023E8A',
            tension: 0.1,
          },
          {
            label: 'Potasio',
            data: result.potasio.predicciones.map(item => item.valor),
            fill: false,
            borderColor: '#FF0303',
            tension: 0.1,
          },
        ],
      };

      setData(newData);
    } catch (error) {
      console.error('Error fetching prediction data', error);
    }
  };

  // Efecto para cargar los datos iniciales al montar el componente
  useEffect(() => {
    getPredictionData(7); // Cargar predicciones por defecto para 7 días al montar
  }, []);

  // Manejar cambios en el período seleccionado
  const handlePeriodChange = (e) => {
    const { name, value } = e.target;
    setPeriod(prevPeriod => ({ ...prevPeriod, [name]: value }));
  };

  // Función para cambiar entre vista de gráfico y tabla
  const toggleView = (viewType) => {
    setView(viewType);
  };

  // Función para expandir/colapsar secciones de información adicional
  const toggleSection = (section) => {
    setSections(prevSections => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
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
