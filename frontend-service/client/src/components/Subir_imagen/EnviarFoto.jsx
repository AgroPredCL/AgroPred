import React, { useState } from 'react';
import ResponseModal from '../Message';
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
const Enviar_foto = ({ file, uploadDate, onClose, onUploadSuccess }) => {
  const [data, setData] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const mimeType = 'image/png'; // Tipo MIME de la imagen

  const handleSendToAPI = async () => {
    if (file) {
      if (onUploadSuccess) {
        onUploadSuccess(uploadDate); // Llamar la función para actualizar la fecha en el componente padre
      }
    } else {
      console.log('No hay imagen seleccionada para subir.');
      return;
    }

    setLoading(true); // Mostrar el spinner de carga

    try {
      // Convertir base64 a Blob porque la bd de mongodb acepta imagenes en binario
      const imageBlob = base64ToBlob(file, mimeType);
      const formData = new FormData();
      formData.append('file', imageBlob, 'imagen.png');

      const response = await fetch('http://127.0.0.1:8000/uploadImage/fruta?image_number=0001', {
        method: 'POST',
        body: formData,
      });


      // Si la respuesta tiene contenido JSON
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }

      // Actualizar el estado con la información recibida
      setResponseData(responseData);
      setIsModalOpen(true); // Abrir el modal
      console.log("contenido de response", responseData)

      setData(responseData.enfermedades.healthy)
      console.log("contenido de data", data)
      setMensaje(`La palta se encuentra en estado ${data.estado}, lo que significa que ${data.descripcion} con un ${data.confiabilidad} de confiabilidad`)
      

    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      setResponseData({ error: 'Error al enviar la imagen' });
      setIsModalOpen(true); // Abrir el modal
    } finally {
      setLoading(false); // Ocultar el spinner de carga
    }
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

      
      {loading && <LoadingSpinner />}
      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        responseData={mensaje}
      />
    </div>
  );
};

export default Enviar_foto;
