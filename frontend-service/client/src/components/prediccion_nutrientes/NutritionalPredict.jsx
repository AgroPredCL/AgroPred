import React, { useState, useEffect, useMemo } from 'react';
import { ArticleNutritional } from './ArticleNutritional';

const NutritionalPredict = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-01-31');
  const [data, setData] = useState(null);
  const [predictDays, setPredictDays] = useState('');
  const [predictedData, setPredictedData] = useState(null); // Para almacenar las predicciones

  const apiUrl = useMemo(() => {
    return `${import.meta.env.VITE_API_URL}/state?start_date=${startDate}&end_date=${endDate}`;
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${apiUrl}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handlePredictionRequest = async () => {
    if (predictDays) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/prediction/NPK?diasAPredecir=${predictDays}`);
        if (!response.ok) {
          throw new Error(`Error fetching prediction data from ${import.meta.env.VITE_API_URL}`);
        }
        const predictionResult = await response.json();

        // Combinar datos originales con predicciones
        const combinedData = {
          nitrogeno: {
            original: data.nitrogeno,
            predicciones: predictionResult.nitrogeno.predicciones,
          },
          fosforo: {
            original: data.fosforo,
            predicciones: predictionResult.fosforo.predicciones,
          },
          potasio: {
            original: data.potasio,
            predicciones: predictionResult.potasio.predicciones,
          },
        };

        setPredictedData(combinedData); // Guardar los datos combinados
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Por favor, ingrese el número de días a predecir');
    }
  };

  if (!data) return <div>Cargando...</div>;

  const mergeData = (originalData, predictedData) => {
    return [
      ...originalData.map((item) => ({ fecha: item.fecha, valor: item.valor })),
      ...predictedData.map((item) => ({ fecha: item.fecha, valor: item.valor })),
    ];
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex space-x-8">
        <div className="flex items-center space-x-2">
          <label htmlFor="start-date" className="text-sm font-medium text-gray-700 w-20">Fecha Inicio</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40 pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="end-date" className="text-sm font-medium text-gray-700 w-20">Fecha Fin</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40 pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <ArticleNutritional 
          titulo='Nitrógeno - Fósforo - Potasio (NPK)'
          data={[
            { label: 'Nitrógeno', data: mergeData(data.nitrogeno, predictedData?.nitrogeno?.predicciones || []), color: 'rgba(255, 99, 132, 1)' },
            { label: 'Fósforo', data: mergeData(data.fosforo, predictedData?.fosforo?.predicciones || []), color: 'rgba(255, 206, 86, 1)' },
            { label: 'Potasio', data: mergeData(data.potasio, predictedData?.potasio?.predicciones || []), color: 'rgba(54, 162, 235, 1)' },
          ]}
          titleChart='NPK  [mg/kg] vs Tiempo [Día]'
        >
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="predict-date" className="block text-sm font-medium text-gray-700">
                Días a predecir
              </label>
              <input
                type="number"
                id="predict-date"
                value={predictDays}
                onChange={(e) => setPredictDays(e.target.value)}
                className="pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handlePredictionRequest}
                className="px-4 py-2 bg-pred text-white rounded-md hover:scale-105 transform transition-transform duration-300 ease-in-out"
              >
                Predecir
              </button>
            </div>
          </div>

        </ArticleNutritional>
        
        <ArticleNutritional 
          titulo='Temperatura'
          data={[
            { label: "Temperatura [°C]", data: data.temperatura },
          ]}
          titleChart="Temperatura [°C] vs Tiempo [día]" 
        >
        </ArticleNutritional>

        <ArticleNutritional 
          titulo='pH'
          data={[
            { label: "pH", data: data.ph },
          ]} 
          titleChart="pH vs Tiempo [día]"
          >
        </ArticleNutritional>

        <ArticleNutritional 
          titulo='Conductividad Eléctrica'
          data={[
            { label: "Conductividad eléctrica", data: data.conductividad }, 
          ]}
          titleChart="Conductividad Eléctrica [mS/cm] vs Tiempo [día]"
          >
        </ArticleNutritional>

        <ArticleNutritional 
          titulo='Humedad'
          data={[
            { label: "Humedad", data: data.humedad },
          ]}
          titleChart="Humedad (%) vs Tiempo [día]" 
        >
        </ArticleNutritional>
      </div>
    </div>
  );
};

export default NutritionalPredict;
