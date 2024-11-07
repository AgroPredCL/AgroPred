import React from 'react';

const PictureSelect = ({ onFileSelect, onCloseCamera  }) => {

  const validTypes = ['image/png', 'image/jpeg'];
  const fileInputRef = React.useRef(null);
  
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validTypes.includes(file.type)) {

      onFileSelect(file);
      console.log("AAAA",onCloseCamera)
      if(undefined !== onCloseCamera){
        onCloseCamera(); // Cierra la cámara cuando se selecciona un archivo
      }
    } else {
      alert('Por favor, seleccione un archivo de imagen válido');
    }
  };

  return (
    <>
      <button onClick={handleClick} style={{ 
      position: 'relative',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#dddddd',
      
      }}>
        Subir Foto
      </button>
      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default PictureSelect;
