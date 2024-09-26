import React from 'react';

const PictureSelect = ({ onFileSelect, onCloseCamera  }) => {
  const fileInputRef = React.useRef(null);
  console.log('PictureSelect');
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
      onCloseCamera(); // Cierra la cámara cuando se selecciona un archivo

    }
  };

  return (
    <>
      <button onClick={handleClick} style={{ 
      position: 'absolute',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#dddddd',
      left: '100px',
      top: '20px',
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
