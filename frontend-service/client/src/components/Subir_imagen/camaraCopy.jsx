// CaptureButton.jsx
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const CaptureButton = ({ onCapture }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const startCamera = () => {
    setError(null);
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const dataUrl = webcamRef.current.getScreenshot();
      if (dataUrl) {
        onCapture(dataUrl); // Envía la imagen capturada al componente padre
        stopCamera(); // Apaga la cámara después de capturar la foto
      }
    }
  };

  return (
    <div>
      {isCameraOn ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            style={{ width: '95%' }}
            onUserMediaError={() => setError("Error al acceder a la cámara")}
          />
          <button
            onClick={capturePhoto}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              backgroundColor: '#dddddd',
            }}
          >
            Capturar Foto
          </button>
        </div>
      ) : (
        <button
          onClick={startCamera}
          style={{
            position: 'relative',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            backgroundColor: '#dddddd',
          }}
        >
          Tomar Foto
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CaptureButton;
