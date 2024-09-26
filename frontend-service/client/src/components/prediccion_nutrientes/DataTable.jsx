import React from 'react';

const DataTable = ({ data }) => {
  // Obtener las fechas y horas únicas para la primera columna
  const fechas = data[0].data.map((entry) => entry.fecha);
  const horas = data[0].data.map((entry) => entry.hora);

  return (
    <div className="overflow-x-auto w-full">
      <div className="overflow-y-auto h-64">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-[rgba(0,0,0,0.40)] text-center text-sm font-light border-b border-b-[#A0AEC0] border-solid">
              <th>Día</th>
              <th>Hora</th>
              {data.map((entry, index) => (
                <th key={index}>{entry.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fechas.map((fecha, i) => (
              <tr key={i} className="bg-gray-100 border-b border-b-[#A0AEC0] border-solid">
                <td className="w-1/6 p-2 border-r border-r-[#A0AEC0] border-solid text-[rgba(0,0,0,0.40)] text-center text-sm font-light">
                  {fecha}
                </td>
                <td className="w-1/6 p-2 border-r border-r-[#A0AEC0] border-solid text-[rgba(0,0,0,0.40)] text-center text-sm font-light">
                  {horas[i]}
                </td>
                {data.map((entry, index) => (
                  <td key={index} className="w-1/6 p-2 border-r border-r-[#A0AEC0] border-solid text-[rgba(0,0,0,0.40)] text-center text-sm font-light">
                    {entry.data[i].valor}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;