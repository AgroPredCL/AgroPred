// src/components/Enviar_foto.js
import React, { useState, useEffect } from 'react';
import Message from '../Message';
import LoadingSpinner from '../Loading';

// Función para convertir base64 a Blob
function base64ToBlob(base64, mime) {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}

// Componente Enviar_foto
const Enviar_foto = ({ file, uploadDate, onClose, onUploadSuccess, tipo }) => {
  const [data, setData] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImage, setShowImage] = useState(true); // Controla visibilidad de ImageUploader

  const mimeType = 'image/png'; // Tipo MIME de la imagen

  const handleSendToAPI = async () => {
    if (!file) {
      console.log('No hay imagen seleccionada para subir.');
      return;
    }
    if (onUploadSuccess) {
      onUploadSuccess(uploadDate); // Actualizar la fecha en el componente padre
    }

    setLoading(true); // Mostrar el spinner de carga

    try {
      const imageBlob = base64ToBlob(file, mimeType);
      const formData = new FormData();
      formData.append('file', imageBlob, 'imagen.png');

      const response = await fetch(`http://127.0.0.1:8000/uploadImage/${tipo}?image_number=0001`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }

      setData(responseData.enfermedades.healthy);
      setIsModalOpen(true); // Abrir el modal
      console.log("contenido de response", responseData);

    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      setData({ error: 'Error al enviar la imagen' });
      setIsModalOpen(true); // Abrir el modal
    } finally {
      setLoading(false); // Ocultar el spinner de carga
    }
  };

  // useEffect para crear el mensaje cuando data cambia
  useEffect(() => {
    if (data) {
      if (data.error) {
        setMensaje(data.error);
      } else {
        console.log("contenido de data", data);
        setMensaje(`La palta se encuentra en estado ${data.estado}, lo que significa que ${data.descripcion} con un ${data.confiabilidad}% de confiabilidad`);
      }
    }
  }, [data]);

  // Función para cerrar modal e imagen al mismo tiempo
  const handleClose = () => {
    setIsModalOpen(false);
    setShowImage(false); // Ocultar ImageUploader
  };

  return (
    <div>
      <button onClick={handleSendToAPI}
        style={{
          position: 'relative',
          backgroundColor: '#96C21F',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}>
        Enviar Foto
      </button>

      <LoadingSpinner open={loading} texto={"Analizando"}/>

      {showImage && (
        <div>
          {/* Aquí iría el componente ImageUploader o similar */}
        </div>
      )}

      <Message
        isOpen={isModalOpen}
        onClose={handleClose} // Cierra modal e imagen
        responseData={mensaje}
      />
    </div>
  );
};

export default Enviar_foto;
