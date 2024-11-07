// UploadImage.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CaptureButton from './camara';
import PictureSelect from './archivos';
import Enviar_foto from './EnviarFoto';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function UploadImage({ onUploadSuccess }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);
  const [open, setOpen] = useState(false);


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

  const handleCapture = (dataUrl) => {
    clearPreviousImage();
    setSelectedImage(dataUrl);
    const currentDate = new Date().toLocaleString();
    setUploadDate(currentDate);
  };

  const clearPreviousImage = () => {
    setSelectedImage(null);
    setUploadDate(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="px-2 py-1 bg-[#96C21F] rounded-md text-base cursor-pointer"
        onClick={handleOpen}
      >
        Subir imagen
      </button>
      {uploadDate && (
        <span style={{ marginLeft: '10px', fontSize: '14px', color: '#555' }}>
          Última Captura: {uploadDate}
        </span>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg overflow-y-auto"
          style={{ maxHeight: '90vh', marginTop: '5vh', marginBottom: '5vh' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div><PictureSelect onFileSelect={handleFileSelect} /></div>
            <div><CaptureButton onCapture={handleCapture} /></div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Imagen a cargar</h3>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
              />
            ) : (
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 bg-white border border-gray-300 mx-auto flex items-center justify-center">
                <span className="text-gray-500">No hay imagen seleccionada</span>
              </div>
            )}
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36">
            <Enviar_foto file={selectedImage} uploadDate={uploadDate} onClose={handleClose} onUploadSuccess={onUploadSuccess} />
            <button className='bg-amber-700 relative text-white w-fit px-4 py-2 border-none rounded cursor-pointer text-lg' onClick={handleClose} >
              Cancelar
            </button>

          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
