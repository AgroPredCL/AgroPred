import React, { useState } from 'react';

const DiseaseTable = ({ data }) => {
  console.log("Info entrada para la tabla", data);

  return (
    <div className='py-2'>
      {data.length > 0 ? (
        <table className="bg-white">
          <thead>
            <tr>
              <th className="border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Enfermedad</th>
              <th className="border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Impacto</th>
              <th className="border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Descripción</th>
              <th className="px-2 text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Confiabilidad</th>
            </tr>
          </thead>
          <tr className="h-2"></tr> {/* Espaciador */}
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Enfermedad}</td>
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Impacto}</td>
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Descripcion}</td>
                <td className="px-4 py-2">{entry.Confiabilidad}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
            <p className="text-[rgba(0,0,0,0.40)] text-center text-xl font-normal leading-[330%]">No hay enfermedades</p>
        )}
    </div>
  );
};

export function Table({ titulo, filtro, data, fechas, confiabilidad }) {
  // Hook de estado para seleccionar el mes
  const [selectedMonth, setSelectedMonth] = useState('');

  // Manejar el cambio en el selector de meses
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filtrar los datos basados en el mes seleccionado
  const filteredData = data.filter(entry => {
    const [entryMonth] = entry.fecha.split(' ');
    return entryMonth === selectedMonth;
  });

  return (
    <div className="p-4 bg-white border-r-2 border-[#A0AEC0]">
        <h2 className="text-center text-lg border-b-2 border-gray-400">{titulo}</h2>
        {filtro && (
            <div className="flex-grow flex my-2 items-center justify-between">
                <select id="month-select" value={selectedMonth} onChange={handleChange} className="ml-2 border p-1">
                    <option value="Periodo">Elige un mes</option>
                    {fechas.map((fecha) => (
                        <option key={fecha.nombre} value={fecha.nombre}>
                            {fecha.nombre}
                        </option>
                    ))}
                </select>
                <p className="text-sm text-gray-500">
                    <span className="kanit-medium">Confiabilidad:</span> {confiabilidad}
              </p>
            </div>
        )}
        <DiseaseTable data={filtro ? filteredData : data} />
    </div>
  );
}
