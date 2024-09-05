// Objective: Send the image to the API and update the date in the parent component 

//Si bien da error,no lo borres porque lo recibe como parametro
const Enviar_foto = ({file, uploadDate,onClose, onUploadSuccess}) => {
  
  console.log('Enre');
  console.log('file',file);
  console.log('date',uploadDate);
  console.log('sucess',onUploadSuccess);
  
  const handleSendToAPI = async () => {
    if (file) {
      if (onUploadSuccess) {
        onUploadSuccess(uploadDate); // Llamar la función para actualizar la fecha en el componente padre
      }
    } else {
      setError('No hay imagen seleccionada para subir.');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData', formData);
/*
     try {
      const response = await fetch('http://127.0.0.1:8000/uploadImage/hoja', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      alert('Imagen enviada con éxito');
      onError(null);
      onClose(); // Cierra el recuadro de la camara al enviar la imagen

    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      onError('Error al enviar la imagen.');
    } */
  };

  return (
    <button onClick={handleSendToAPI}
      style={{
      position: 'absolute', 
      backgroundColor: '#96C21F', 
      color: 'white', 
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      top: '500px',
      left: '300px',
      }}>Enviar Foto</button>

    
  );
};

export default Enviar_foto;
