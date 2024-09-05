import React, { useState } from 'react';

export default function HomePage () {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleToggleFormulario}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      
      {mostrarFormulario && (
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Factor de corrección debido al área sombreada</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Eficiencia de aplicación de riego</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marco de plantación en metros cuadrados</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Caudal del emisor (L/h)</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de emisores por planta</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Coeficiente de Uniformidad</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacidad de retención de agua del suelo (mm/mm)</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profundidad de raíces (mm)</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Umbral de riego</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Porcentaje de suelo mojado por los emisores</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fracción de piedras presentes en el perfil de suelo</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
        </form>
      )}
    </div>
  );
};