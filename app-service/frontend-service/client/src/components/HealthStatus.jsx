import React from 'react';
import img1 from '../assets/image 1.png';


const HealthStatus = () => {
  return (
    <section className="mb-4">
      <h2 className="flex items-center border-b-2 border-[#A0AEC0]  text-black text-[32px] not-italic font-light leading-[150%]">
        <img src={img1} alt="Logo" className="h-8 w-8 mr-2" />
          Estado de Salud      
      </h2>

      <div className="bg-white p-4shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] rounded-[5px_5px_0px_0px] border-b-[5px] border-b-[#95C11F] border-solid;">
        <div className='grid grid-cols-2 gap-4'>
          <div className="p-4 bg-white">

            <h3 className="text-[20px] font-light border-b-2 border-[#A0AEC0] ">
              Actualidad
            </h3>
            
            
            <p className="text-[rgba(0,0,0,0.40)] text-center text-xl not-italic font-normal leading-[330%]">No hay enfermedades</p>
          </div>
          
          <div className="p-4 bg-white">
            {/* Contenido de la columna derecha */}
            <h4 className="text-[20px] font-light border-b-2 border-[#A0AEC0]">Predicciones</h4>
            
            <div className="grid grid-cols-2 gap-4">

              <div className='text-[#878790] text-xl text-left text-[16px] font-normal'>
              Periodo [mm-yy]  
              </div>
              <div className='text-[#878790] text-xl text-right text-[16px] font-normal'>
              Confiabilidad 55% 
              </div>
            </div>
            
            <div className='grid grid-cols-4 '>
                <div className='text-[#878790] text-center text-[16px] font-normal; border-r-[#A0AEC0] border-r border-solid;'>
                  Enfermedad
                </div>


                <div className='text-[#878790] text-center text-[16px] font-normal; border-r-[#A0AEC0] border-r border-solid;'>
                  Impacto
                </div>

                <div className='text-[#878790] text-center text-[16px] font-normal; border-r-[#A0AEC0] border-r border-solid;'>
                  Descricpión
                </div>

                <div className='text-[#878790] text-center text-[16px] font-normal; border-r-[#A0AEC0] border-r border-solid;'>
                  Fecha estimada de Aparción 
                </div>




            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthStatus;
