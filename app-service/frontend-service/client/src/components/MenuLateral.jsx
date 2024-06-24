import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4">
      <input 
        type="text" 
        placeholder="Buscar cuartel por ID" 
        className="mb-4 p-2 w-full border rounded" 
      />
      <div className="mb-4">
        <h2 className="font-bold">Filtro Cuarteles</h2>
        <div className="my-2">
          <label>Área (Ha)</label>
          <input type="text" placeholder="Min" className="w-full border rounded mb-1 p-2" />
          <input type="text" placeholder="Max" className="w-full border rounded p-2" />
        </div>
        <div className="my-2">
          <label>Cantidad de árboles</label>
          <input type="text" placeholder="Min" className="w-full border rounded mb-1 p-2" />
          <input type="text" placeholder="Max" className="w-full border rounded p-2" />
        </div>
      </div>
      <nav>
        <a href="#" className="block mb-2 text-green-700">Estado Cuartel 1</a>
        <a href="#" className="block mb-2 text-green-700">Estado Cuartel 2</a>
        <a href="#" className="block mb-2 text-green-700">Estado Cuartel 3</a>
        <a href="#" className="block mb-2 text-green-700">Estado Cuartel 4</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
