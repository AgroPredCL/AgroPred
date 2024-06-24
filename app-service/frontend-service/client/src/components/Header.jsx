import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="AgroPred Logo" className="h-10" />
        <nav className="ml-6">
          <a href="#" className="text-gray-700 mx-2">Inicio</a>
          <a href="#" className="text-gray-700 mx-2">Estado Cuarteles</a>
          <a href="#" className="text-gray-700 mx-2">Gestión Predio</a>
          <a href="#" className="text-gray-700 mx-2">Gestión Empleados</a>
          <a href="#" className="text-gray-700 mx-2">Soporte</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
