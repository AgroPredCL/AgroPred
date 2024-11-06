// CaptureButton.jsx
import React, { useState, useRef, useEffect } from 'react';

const CaptureButton = ({ onCapture }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      // Clean up the camera when component unmounts
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setIsCameraOn(true);
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = streamRef.current;
    } catch (err) {
      setError('Error al acceder a la cámara: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    onCapture(dataUrl); // Send the captured image back to the parent component
    stopCamera(); // Stop the camera after capture
  };

  return (
    <div>
      {isCameraOn ? (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: '95%' }}></video>
          <button onClick={capturePhoto} style={{ 
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#dddddd',
      
      }}>Capturar Foto
          </button>
        </div>
      ) : (
        <button onClick={startCamera} style={{ 
          position: 'relative',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          backgroundColor: '#dddddd',

          }}>Tomar Foto</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CaptureButton;
