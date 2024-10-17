import React, { useState } from 'react';
import LineChart from './LineChart'; // Importar LineChart


export function ArticleHidrica({ titulo, data, titleChart, children }) {
  
  return (
    <article className="mx-2 font-kanit py-6 bg-white border-b-1 border-b-gray-400 my-2">

      <div id="cuerpo" className={`px-4 transition-height`}>
        
        <div className='flex items-start justify-between'>
          
          {/* Componente del gráfico */}
          <div className='w-4/5 border-r-2'>
            <LineChart data={data} title={titleChart} />
          </div>

          
        </div>
      </div>
    </article>
  );
}

export default ArticleHidrica;
