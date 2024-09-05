import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function Seccion({ titulo, actualizacion, ultimaLectura, children }) {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  
    const arrowClass = isOpen ? 'rotate-0' : 'rotate-90';
    const bodyClass = isOpen ? 'max-height-full' : 'max-height-0';
  
    return (
      <section className="mx-8 font-kanit pb-6 bg-white border-b-4 border-b-agro my-6">
        <div id="Titulo" className="flex items-center cursor-pointer" onClick={toggleOpen}>
          <img
            src="/arrow-expand.png"
            alt="Flecha"
            className={arrowClass}
          />
          <div className="flex-grow flex items-center justify-between mr-12 border-b-2 border-gray-400">
            <h1 className="text-2xl">
              {titulo}
            </h1>
            {actualizacion && (
              <p className="text-sm text-gray-500">
                <span className="kanit-medium">{actualizacion}:</span> {ultimaLectura}
              </p>
            )}
          </div>
        </div>
  
        <div id="cuerpo" className={`px-12 transition-height ${bodyClass}`}>
          {children}
        </div>
      </section>
    );
  }
  
  Seccion.propTypes = {
    titulo: PropTypes.string.isRequired,
    actualizacion: PropTypes.string,
    ultimaLectura: PropTypes.string,
    children: PropTypes.node.isRequired,
  };