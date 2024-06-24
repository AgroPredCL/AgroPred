import React from 'react';

const HealthStatus = () => {
  return (
    <section className="mb-4">
      <h2 className="text-xl font-bold mb-2">Estado de Salud</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-4">
          <span>Actualidad</span>
          <span>No hay enfermedades</span>
        </div>
        <div className="flex justify-between">
          <span>Predicciones</span>
          <div>
            <p>Enfermedad: <strong>Antracnosis</strong></p>
            <p>Impacto: <strong>Alto</strong></p>
            <p>Fecha estimada aparición: <strong>Octubre 2024</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthStatus;
