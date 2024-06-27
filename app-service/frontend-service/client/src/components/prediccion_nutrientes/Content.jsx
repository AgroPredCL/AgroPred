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
import { ArticleNutritional } from './ArticleNutritional';

export function Content({ titulo, tituloGrafico }) {
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
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: tituloGrafico,
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


    return (
        <ArticleNutritional titulo={titulo}>
            <div className="mt-2 pb-4 border-b-2 border-gray-200">
                <div id='filtros' className='flex-grow flex items-center justify-between my-2'>
                    <div>
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
                    <div>
                        <button onClick={() => toggleView('graph')} className={`px-4 py-2 rounded ${view === 'graph' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}>Gráfico</button>
                        <button onClick={() => toggleView('table')} className={`px-4 py-2 rounded ml-2 ${view === 'table' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}>Tabla</button>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    <span className="kanit-medium">Confiabilidad:</span> 95%
                </p>
                {view === 'graph' && (
                    <>
                    <Line data={data} options={options} />
                    </>
                )}
                {view === 'table' && (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className='border-b'>
                                <th>Semana</th>
                                <th>Nitrógeno</th>
                                <th>Fósforo</th>
                                <th>Potasio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.labels.map((label, index) => (
                                <tr key={label} className='border-b py-1'>
                                    <td className="py-1">{label}</td>
                                    <td className="py-1">{data.datasets[0].data[index]}</td>
                                    <td className="py-1">{data.datasets[1].data[index]}</td>
                                    <td className="py-1">{data.datasets[2].data[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </ArticleNutritional>
    );
}
