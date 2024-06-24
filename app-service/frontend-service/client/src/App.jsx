import React from 'react';
import './App.css';
//import NutritionalPrediction from './NutritionalPrediction'; // Asegúrate de que la ruta sea correcta
import Header from './components/Header.jsx';
import MenuLateral from './components/MenuLateral.jsx';
import MainContent from './components/MainContent.jsx';

function App() {
  return (
    /*{ <>
      <h1 className='text-yellow-400'>Hello World</h1>
      <NutritionalPrediction /> 
      <EstadoSalud /> 
    </> }*/
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MenuLateral />
        <MainContent />
      </div>
    </div>
  );
}

export default App;