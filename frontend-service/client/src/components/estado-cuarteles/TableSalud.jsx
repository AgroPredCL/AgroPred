import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from '@components/Tab';

const DiseaseTable = ({ data }) => {
  return (
    <div className='overflow-x-auto shadow-md rounded-lg'>
      { data.enfermedad==true ? (
      <table className='w-full bg-white'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Enfermedad
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Impacto
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Descripción
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Confiabilidad
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Recomendaciones
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            
              <tr
                
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {data.estado}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {data.impacto}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  {data.descripcion}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {data.confiabilidad}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  <ul className='list-disc list-inside'>
                    {data.recomendaciones.map((recomendacion, index) => (
                      <li key={index}>{recomendacion}</li>
                    ))}
                  </ul>
                </td>
              </tr>
           
          </tbody>
      </table>
      ) : (
        <p className='text-gray-500 text-center text-xl font-normal py-8'>
          No se predicen enfermedades para este cuartel
        </p>
      )}
    </div>
  );
};

DiseaseTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      estado: PropTypes.string.isRequired,
      impacto: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      confiabilidad: PropTypes.number.isRequired,
      recomendaciones: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,

};

export function Table({ actualidad, predicciones, nombreCuartel }) {
  const [activeTab, setActiveTab] = useState('actualidad');
  //const [selectedMonth, setSelectedMonth] = useState('');
  

  const handleTabChange = tab => {
    setActiveTab(tab);
    //setSelectedMonth('');
  };

  const handleMonthChange = event => {
    //setSelectedMonth(event.target.value);
  };

  //console.log('actualidad:', actualidad);
  console.log('predicciones:', predicciones);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex' aria-label='Tabs'>
          <Tab
            label='Actualidad'
            active={activeTab === 'actualidad'}
            onClick={() => handleTabChange('actualidad')}
          />
          <Tab
            label='Predicciones'
            active={activeTab === 'predicciones'}
            onClick={() => handleTabChange('predicciones')}
          />
        </nav>
      </div>

      {activeTab === 'predicciones' && (
        <div className='px-4 py-3 border-b border-gray-200'>
          {predicciones !=undefined ? (
            <DiseaseTable data={predicciones}  />
            ) : (
            <p className='text-gray-500 text-center text-xl font-normal py-8'>
              No se predicen enfermedades paara este cuartel
            </p>
          )}  
        </div>
      )}
        
        {activeTab === 'actualidad' && (
        <div className='px-4 py-3 border-b border-gray-200'>
          {actualidad.length>0 ? (
            <div></div>
            ) : (
            <p className='text-gray-500 text-center text-xl font-normal py-8'>
              Actualmente no hay enfermedades presentes en el cuartel {nombreCuartel}
            </p>
          )}  
        </div>
      )}
        

      {/* <div className='p-4'>
        <DiseaseTable data={filteredData} selectedMonth={selectedMonth} />
      </div> */}
    </div>

  );
}

Table.propTypes = {
  actualidad: PropTypes.array.isRequired,
  predicciones: PropTypes.array.isRequired,

};
