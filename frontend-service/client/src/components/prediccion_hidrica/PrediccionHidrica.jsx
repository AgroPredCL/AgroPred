import React, { useState } from 'react';
import ArticleHidrica from './ArticleHidrica';

const apiUrl = import.meta.env.VITE_API_URL;

const HydriclPredict = () => {
  const [data, setData] = useState(null);
  const [predictDays, setPredictDays] = useState('');
  const [predictedData, setPredictedData] = useState(null);

  // Función para manejar la solicitud de predicción
  const handlePredictionRequest = async () => {
    if (predictDays) {
      try {
        const response = await fetch(`${apiUrl}/state/hidrico?factorAreaSombreada=0.49&eficienciaRiego=0.85&marcoM2Plantacion=25&caudalEmisor=3&numEmisoresPlanta=16&coefUniformidad=0.75&retencionAguaSuelo=0.19&profundidadRaices=800&umbralRiego=0.35&porcentajeSueloEmisores=0.6&piedrasPerfilSuelo=0.1&cantidadDeDias=${predictDays}`);
        if (!response.ok) {
          throw new Error('Error al obtener datos de la API');
        }
        const result = await response.json();
        setData(result);
        setPredictedData(result);
        console.log("data>",data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      console.log('Por favor, ingrese el número de días a predecir');
    }
  };
  console.log("data predica>",predictedData)
  
  
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 14)) {
      setPredictDays(value);
    }
  };

  // Transformar los datos en el formato adecuado para el gráfico
  const formatDataForChart = (apiData) => {
    return Object.entries(apiData).map(([date, value]) => ({
      label: date, // Fecha como etiqueta
      data: value, // Valor correspondiente a la fecha
      color: '#0000ff', // Color de la línea (puedes cambiarlo)
    }));
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="predict-date" className="block text-sm font-medium text-gray-700">
          Días a predecir
        </label>
        <input
          type="number"
          id="predict-water"
          min="1"
          max="14"
          value={predictDays}
          onChange={handleInputChange} //Aqui se llama a una funcion que esta mas arriba que se asegura que cuando se ingrese el numero se cumpla que sea mayor/gual a 1 y menor/igual a 14
          className="pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          onClick={handlePredictionRequest}
          className="px-4 py-2 bg-pred text-white rounded-md hover:scale-105 transform transition-transform duration-300 ease-in-out"
        >
          Predecir
        </button>
      </div>

      {/* Si hay datos predichos, mostrar el gráfico usando ArticleHidrica */}
      {predictedData ? (
        console.log("Segunda reivion",formatDataForChart(predictedData)),

        <ArticleHidrica
          titulo="Estado Hídrico"
          data={formatDataForChart(predictedData)} // Formato para el gráfico
          titleChart="Agua Disponible [L] vs Tiempo [Día]"
        >
          {/* Aquí puedes agregar contenido adicional si es necesario */}
        </ArticleHidrica>
      ) : (
        <p>Ingrese días a predecir para ver el gráfico</p>
      )}
    </div>
  );
  
};

export default HydriclPredict;
