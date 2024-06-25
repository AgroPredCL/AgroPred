import React, { useState } from 'react';
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
  const [period, setPeriod] = useState({ start: 'Enero', end: 'Junio' });
  const [view, setView] = useState('graph'); // 'graph' or 'table'
  const [sections, setSections] = useState({
    NPK: false,
    Temperature: false,
    PH: false,
    Conductivity: false,
    Humidity: false,
  });

  // Función para simular cambio de datos según el periodo seleccionado
  const getDataForPeriod = (start, end) => {
    // Aquí puedes reemplazar con la lógica para obtener datos de la base de datos
    // Vamos a simular datos random para mostrar cómo se cambiarían
    const newData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Nitrógeno',
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 25),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: 'Fósforo',
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 20),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
        {
          label: 'Potasio',
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10) + 30),
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1,
        },
      ],
    };

    return newData;
  };

  // Función para cambiar el periodo
  const handlePeriodChange = (e) => {
    const { name, value } = e.target;
    setPeriod((prev) => ({ ...prev, [name]: value }));

    // Aquí deberías llamar a una función que obtenga datos actualizados de la base de datos
    // y actualizar el estado de 'data' con los nuevos datos.
    // Esto es solo un ejemplo utilizando datos random.
    const newData = getDataForPeriod(period.start, period.end);
    setData(newData);
  };

  const [data, setData] = useState(getDataForPeriod(period.start, period.end));

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

  const toggleView = (viewType) => {
    setView(viewType);
  };

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === section ? !prev[key] : false;
        return acc;
      }, {})
    }));
  };

  return (
    <div className="p-4 overflow-y-auto">
      <h2 className='text-blue-500 text-2xl mb-4'>Predicción Estado Nutricional</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('NPK')}>
          <div className="mb-2 font-semibold">NPK</div>
          <div>{sections.NPK ? '−' : '+'}</div>
        </div>
        {sections.NPK && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <label>
                Inicio:
                <select name="start" value={period.start} onChange={handlePeriodChange}>
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>
                  <option value="Marzo">Marzo</option>
                  <option value="Abril">Abril</option>
                  <option value="Mayo">Mayo</option>
                  <option value="Junio">Junio</option>
                </select>
              </label>
              <label className="ml-4">
                Fin:
                <select name="end" value={period.end} onChange={handlePeriodChange}>
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>
                  <option value="Marzo">Marzo</option>
                  <option value="Abril">Abril</option>
                  <option value="Mayo">Mayo</option>
                  <option value="Junio">Junio</option>
                </select>
              </label>
            </div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => toggleView('graph')} className={`px-2 py-1 ${view === 'graph' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Gráfico</button>
              <button onClick={() => toggleView('table')} className={`px-2 py-1 ml-2 ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Tabla</button>
            </div>
            {view === 'graph' && (
              <>
                <Line data={data} options={options} />
                <p className="text-right text-sm text-gray-500 mt-2">Confiabilidad: 95%</p>
              </>
            )}
            {view === 'table' && (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Nitrógeno</th>
                    <th>Fósforo</th>
                    <th>Potasio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.labels.map((label, index) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{data.datasets[0].data[index]}</td>
                      <td>{data.datasets[1].data[index]}</td>
                      <td>{data.datasets[2].data[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Temperature')}>
          <div className="mb-2 font-semibold">Temperatura</div>
          <div>{sections.Temperature ? '−' : '+'}</div>
        </div>
        {sections.Temperature && (
          <div>
            <p>Información sobre Temperatura.</p>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('PH')}>
          <div className="mb-2 font-semibold">PH</div>
          <div>{sections.PH ? '−' : '+'}</div>
        </div>
        {sections.PH && (
          <div>
            <p>Información sobre PH.</p>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Conductivity')}>
          <div className="mb-2 font-semibold">Conductividad eléctrica</div>
          <div>{sections.Conductivity ? '−' : '+'}</div>
        </div>
        {sections.Conductivity && (
          <div>
            <p>Información sobre Conductividad eléctrica.</p>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Humidity')}>
          <div className="mb-2 font-semibold">Humedad</div>
          <div>{sections.Humidity ? '−' : '+'}</div>
        </div>
        {sections.Humidity && (
          <div>
            <p>Información sobre Humedad.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionalPrediction;
