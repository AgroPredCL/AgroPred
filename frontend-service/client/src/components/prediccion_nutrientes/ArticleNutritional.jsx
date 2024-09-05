import React, { useState } from 'react';
import LineChart from './LineChart'; // Importar LineChart
import DataTable from './DataTable'; // Importar DataTable

export function ArticleNutritional({ titulo, data, titleChart, children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [viewMode, setViewMode] = useState('chart'); // Estado para cambiar entre gráfico y tabla
  
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  
    const arrowClass = isOpen ? 'rotate-0' : 'rotate-minus-90';
    const bodyClass = isOpen ? 'max-height-full' : 'max-height-0';
  
    return (
      <article className="mx-2 font-kanit py-6 bg-white border-b-1 border-b-gray-400 my-2">
        <div id="Titulo" className="flex items-center cursor-pointer" onClick={toggleOpen}>
          <div className="flex-grow flex items-center justify-between border-t-2 border-gray-400 pb-4">
            <h1 className="text-lg">
              {titulo}
            </h1>
            <img
            src="/arrow-expand.png"
            alt="Flecha"
            className={arrowClass}
            />
          </div>
        </div>
  
        <div id="cuerpo" className={`px-4 transition-height ${bodyClass}`}>
          
          <div className='flex items-center justify-items-center pb-4'>
            { children }

            <button
              onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
              className="ml-auto px-4 py-2 bg-agro text-white rounded-md shadow-sm hover:scale-105 transform transition-transform duration-300 ease-in-out"
            >
              {viewMode === 'chart' ? 'Ver Tabla' : 'Ver Gráfico'}
            </button>
          </div>

          {viewMode === 'chart' ? (
            <LineChart data={ data } title={ titleChart } />
          ) : (
            <DataTable data={data.map(({ color, ...rest }) => ({ ...rest }))}/>
          )}

        </div>
      </article>
    );
}