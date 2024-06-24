import React from 'react';
import './App.css';
import NutritionalPrediction from './NutritionalPrediction'; // Asegúrate de que la ruta sea correcta
import EstadoSalud from './components/EstadoSalud'; // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <>
      <h1 className='text-yellow-400'>Hello World</h1>
      <NutritionalPrediction /> {/* Usa el componente aquí */}
      <EstadoSalud /> {/* Usa el componente aquí */}
    </>
  );
}

export default App;