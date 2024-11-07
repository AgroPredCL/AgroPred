// UploadImage.js
import React, { useState } from 'react';
import CaptureButton from './camaraCopy';
import PictureSelect from './archivos';
import Enviar_foto from './EnviarFoto';

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
      
      {/* Modal overlay and container */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 mx-4 overflow-y-auto max-h-[90vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div>
                <PictureSelect onFileSelect={handleFileSelect} />
              </div>
              <div>
                <CaptureButton onCapture={handleCapture} />
              </div>
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
              <Enviar_foto
                file={selectedImage}
                uploadDate={uploadDate}
                onClose={handleClose}
                onUploadSuccess={onUploadSuccess}
              />
              <button
                className="bg-amber-700 text-white w-fit px-4 py-2 rounded cursor-pointer text-lg"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
