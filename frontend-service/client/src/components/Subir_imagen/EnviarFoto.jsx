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
  
  console.log('onclose',onClose);
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

      const response = await fetch('http://127.0.0.1:8000/uploadImage/fruta?image_number=0001', {
        method: 'POST',
        body: formData,
      });
       // Log completo de la respuesta
      console.log('Estado de la respuesta:', response.status);
      console.log('Respuesta completa:', response);

      // Si la respuesta tiene contenido JSON
      const responseData = await response.json();
      console.log('Contenido de la respuesta JSON:', responseData);

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
      }


      alert('Imagen enviada con éxito');
      console.log(response)

      onClose(); // Cierra el recuadro de la camara al enviar la imagen

    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }  
  }; 
  

  return (
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
      
      }}>Enviar Foto</button>

    
  );
};

export default Enviar_foto;
