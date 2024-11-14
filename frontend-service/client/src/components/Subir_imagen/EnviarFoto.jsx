import React, { useState, useEffect } from 'react';
import Message from '../Message';
import LoadingSpinner from '../Loading';
import { usePostUploadFrutaMutation, usePostUploadHojaMutation } from '@services/apiSliceModelos';

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
  const [uploadFrutaImage] = usePostUploadFrutaMutation();
  const [uploadHojaImage] = usePostUploadHojaMutation(); // Corregido aquí

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
    //console.log("file",file)
    try {
      const imageBlob = base64ToBlob(file, mimeType);
      const formData = new FormData();
      formData.append('file', imageBlob, '01.png');
      //console.log("tipo",tipo)
      //console.log("formData",formData)
      let response;
      if (tipo === 'fruta') {
        response = await uploadFrutaImage(formData).unwrap(); // Corregido aquí
      } else if (tipo === 'hoja') {
        response = await uploadHojaImage(formData).unwrap(); // Corregido aquí
      } else {
        throw new Error('Tipo de imagen no soportado');
      }



      setData(response);
      setIsModalOpen(true); // Abrir el modal
      console.log("contenido de response", response);

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
        const colorEstado = data.estado === 'sana';

        setMensaje(
          <div>
            <p className="font-semibold mb-2">
              La palta se encuentra en estado: <span className={`${colorEstado ? 'text-green-600' : 'text-red-600'} ml-2`}>{data.estado}</span>
            </p>
            <p className="mb-2">{data.descripcion}</p>
            <p className="text-sm text-gray-600">
              Confiabilidad: <span className="font-bold">{data.confiabilidad}%</span>
            </p>
          </div>
        );
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
        titleData={"Resultado del análisis"}
      />
    </div>
  );
};

export default Enviar_foto;
