import React, { useState } from 'react';
import LineChart from './LineChart'; // Importar LineChart

export function ArticleHidrica({ titulo, data, titleChart, children }) {
  
    return (
      <article className="mx-2 font-kanit py-6 bg-white border-b-1 border-b-gray-400 my-2">
  
        <div id="cuerpo" className={`px-4 transition-height `}>
          
          <div className='flex items-center justify-items-center'>
            { children }

            <LineChart data={ data } title={ titleChart } />

          </div>

          

        </div>
      </article>
    );
}

export default ArticleHidrica;
