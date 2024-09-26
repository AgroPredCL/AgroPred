import React, { useState } from 'react';
import InfoBox from './recuadro';

const UploadImage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [uploadDate, setUploadDate] = useState(null);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  const handleUploadSuccess = (date) => {
    setUploadDate(date);
    setShowInfo(false);
  };
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleClick} style={{
          padding: '5px 10px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#96C21F',
          cursor: 'pointer',
          fontSize: '16px',
          position: 'absolute', // Posiciona el botón de manera absoluta
          top: '27px', // Ajusta según sea necesario
          right: '400px' // Ajusta según sea necesario
        }} >
        Subir Imagen
      </button>
      
      {uploadDate && (
        <span style={{ position: 'absolute', // Posiciona el span de manera absoluta
          top: '27px', // Ajusta según sea necesario
          right: '70px', // Ajusta según sea necesario
          backgroundColor: 'white', // Opcional: añade un fondo para mayor visibilidad
          padding: '5px', // Opcional: añade padding para mayor espacio
          borderRadius: '5px',// Opcional: añade bordes redondeados 
          }}>Ultima Captura {uploadDate}</span>
      )}

      {showInfo && <InfoBox onClose={handleClose} onUploadSuccess={handleUploadSuccess} />}
    </div>
  );
};

export default UploadImage;