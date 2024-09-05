import React, { useState, useEffect, useMemo } from 'react';
import { ArticleNutritional } from './ArticleNutritional';


const NutritionalPredict = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-01-31');
  const [data, setData] = useState(null);

  const apiUrl = useMemo(() => {
    return `http://127.0.0.1:8000/state?start_date=${startDate}&end_date=${endDate}`;
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!data) return <div>Cargando...</div>;

  return (
    <div className="space-y-4 p-4">
      <div className="flex space-x-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <ArticleNutritional 
        titulo='Nitrógeno - Fósforo - Potasio (NPK)'
        data={[
          { label: 'Nitrógeno', data: data.nitrogeno, color: 'rgba(255, 99, 132, 1)' },
          { label: 'Fósforo', data: data.fosforo, color: 'rgba(255, 206, 86, 1)' },
          { label: 'Potasio', data: data.potasio, color: 'rgba(54, 162, 235, 1)' },
        ]} 
        titleChart='NPK  [mg/kg] vs Tiempo [Día]'>
          <label htmlFor="predict-date" className="block text-sm font-medium text-gray-700 mr-4">Días a predecir</label>
          <input
            type="number"
            id="predict-date"
            // value=""
            // onChange=""
            className="pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro focus:border-agro sm:text-sm"
          />
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
