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
  // Estado local para el período, vista y secciones colapsables
  const [period, setPeriod] = useState({ start: 'Enero', end: 'Marzo' });
  const [view, setView] = useState('graph'); // 'graph' or 'table'
  const [sections, setSections] = useState({
    NPK: true,  // NPK se muestra por defecto al inicio
    Temperatura: false,
    PH: false,
    ConductividadElectrica: false,
    Humedad: false,
  });

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

  // Función para cambiar entre vista de gráfico y tabla
  const toggleView = (viewType) => {
    setView(viewType);
  };

  // Función para expandir/colapsar secciones de información adicional
  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-4 overflow-y-auto">
      <h2 className='text-green-700 text-2xl mb-4'>Predicción Estado Nutricional</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 border-t-4 border-green-700">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('NPK')}>
          <div className="mb-2 font-semibold text-gray-700">NPK</div>
          <div className="text-green-700">{sections.NPK ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
        </div>
        {sections.NPK && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <label>
                Inicio:
                <select name="start" value={period.start} onChange={handlePeriodChange} className="ml-2 border rounded px-2 py-1">
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </label>
              <label className="ml-4">
                Fin:
                <select name="end" value={period.end} onChange={handlePeriodChange} className="ml-2 border rounded px-2 py-1">
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => toggleView('graph')} className={`px-4 py-2 border ${view === 'graph' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}>Gráfico</button>
              <button onClick={() => toggleView('table')} className={`px-4 py-2 border ml-2 ${view === 'table' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}>Tabla</button>
            </div>
            {view === 'graph' && (
              <>
                <Line data={data} options={options} />
                <p className="text-right text-sm text-gray-500 mt-2">Confiabilidad: 95%</p>
              </>
            )}
            {view === 'table' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-right text-sm text-gray-500">Confiabilidad: 95%</p>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b">Semana</th>
                      <th className="border-b">Nitrógeno</th>
                      <th className="border-b">Fósforo</th>
                      <th className="border-b">Potasio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.labels.map((label, index) => (
                      <tr key={label}>
                        <td className="border-b py-1">{label}</td>
                        <td className="border-b py-1">{data.datasets[0].data[index]}</td>
                        <td className="border-b py-1">{data.datasets[1].data[index]}</td>
                        <td className="border-b py-1">{data.datasets[2].data[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
      {['Temperatura', 'PH', 'Conductividad Eléctrica', 'Humedad'].map((section) => (
        <div key={section} className="bg-white shadow-md rounded-lg p-6 mb-4 border-t-4 border-green-700">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(section)}>
            <div className="mb-2 font-semibold text-gray-700">{section}</div>
            <div className="text-green-700">{sections[section] ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
          </div>
          {sections[section] && (
            <div>
              <p>Información sobre {section}.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NutritionalPrediction;
