import React, { useState } from 'react';

export function ArticleNutritional({ titulo, children }) {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  
    const arrowClass = isOpen ? 'rotate-0' : 'rotate-minus-90';
    const bodyClass = isOpen ? 'max-height-full' : 'max-height-0';
  
    return (
      <article className="mx-2 font-kanit pb-6 bg-white border-b-1 border-b-gray-400 my-2">
        <div id="Titulo" className="flex items-center cursor-pointer" onClick={toggleOpen}>
          <div className="flex-grow flex items-center justify-between border-b-2 border-gray-400">
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
  
        <div id="cuerpo" className={`px-0 transition-height ${bodyClass}`}>
          {children}
        </div>
      </article>
    );
}