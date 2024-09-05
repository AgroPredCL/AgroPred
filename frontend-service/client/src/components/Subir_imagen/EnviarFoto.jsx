// Objective: Send the image to the API and update the date in the parent component 


function base64ToBlob(base64, mime) {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}


//Si bien da error,no lo borres porque lo recibe como parametro
const Enviar_foto = ({file, uploadDate,onClose, onUploadSuccess}) => {
  
  console.log('Enre');
  console.log('file',file);
  console.log('date',uploadDate);
  console.log('sucess',onUploadSuccess);
  const mimeType = 'image/png'; // Tipo MIME de la imagen

  


  

  const handleSendToAPI = async () => {
    if (file) {
      if (onUploadSuccess) {
        onUploadSuccess(uploadDate); // Llamar la función para actualizar la fecha en el componente padre
        
      }
    } else {
      console.log('No hay imagen seleccionada para subir.');
    }

    
    try {

      // Convertir base64 a Blob porque la bd de mongodb acepta imagenes en binario
      const imageBlob = base64ToBlob(file, mimeType);
      console.log('imageBlob',imageBlob);
      const formData = new FormData();
      formData.append('file', imageBlob, 'imagen.png');

      const response = await fetch('uploadImage/hoja', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      alert('Imagen enviada con éxito');
      onClose(); // Cierra el recuadro de la camara al enviar la imagen

    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }  
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
