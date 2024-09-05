//La idea de esta cosa es que al hacer click en el boton de subir imagen se abra un recuadro donde se
//pueda subir una imagen desde la camara o al examinar archivos

import React, { useState } from 'react';
import CaptureButton from './camara'; // Importar CaptureButton que tendra el boton de la camara
import PictureSelect from './archivos'; // Importar PictureSelect que tendra el boton de examinar archivos
import Enviar_foto from './Enviar_foto'; // Importar Enviar_foto que tendra el boton de enviar la foto a la API

//Si bien da error, no lo borres, porque es necesario para que funcione porque asi actualza la info real
const InfoBox = ({ onClose, onUploadSuccess }) => {  

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);

  //Funcion para manejar la seleccion de un archivo
  const handleFileSelect = (file) => {
    clearPreviousImage();
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      const currentDate = new Date().toLocaleString();
      setUploadDate(currentDate);
    };
    reader.readAsDataURL(file);
  };

  //Funcion para manejar la captura de una imagen
  const handleCapture = (dataUrl) => {
    clearPreviousImage();
    setSelectedImage(dataUrl);
    const currentDate = new Date().toLocaleString();
    setUploadDate(currentDate);
  };

  //Funcion para limpiar la imagen previa cuando se desea pasar de subir foto a capturar foto o viceversa
  const clearPreviousImage = () => {
    setSelectedImage(null);
    
    setUploadDate(null);
  };

  //Funcion para manejar el exito de la subida de la imagen, se activa cuando la imagen se sube correctamente
  const handleSuccess = () => {
    alert('Imagen subida con éxito');
    onClose(); // Close the InfoBox after success
  };

  return (
    <div style={{ 
      position: 'absolute', 
      backgroundColor: 'white', 
      border: '1px solid black', 
      borderRadius: '5px',
      padding: '10px', 
      zIndex: 1, 
      top: 10,
      right: 500,
      width: '800px',
      height: '600px'}}>
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '-25px',
          right: '5px',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '50px',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      
      <div >
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <PictureSelect onFileSelect={handleFileSelect} />
          </div>
          <div style={{ flex: 1 }}>
            <CaptureButton onCapture={handleCapture} />
          </div>
        </div>

        {selectedImage && (
          <div style={{position:'absolute', top:'100px', left:'100px'}} >
            <h3>Imagen a cargar</h3>
            <img src={selectedImage} alt="Selected" style={{ width: '70%', maxHeight: '500px' }} />
             
          </div>
        )} 
        
        <Enviar_foto file={selectedImage} uploadDate={uploadDate} onUploadSuccess={onUploadSuccess} />
        
        
         
      </div>
    </div>
  );
};

export default InfoBox;
