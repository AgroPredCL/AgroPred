import React, {useState} from 'react';
import img1 from '../assets/image 1.png';
import axios from 'axios';


const data = [
  {
    fecha: "Enero",
    Enfermedad: "Antracnosis",
    Impacto: "Alto",
    Descripcion: "Aparece en condiciones húmedas y cálidas.",
    Confiabilidad: 55,
  },
  {
    fecha: "Febrero",
    Enfermedad: "Asfixia Raidicular",
    Impacto: "Alto",
    Descripcion: "Aparece en condiciones de alta humedad.",
    Confiabilidad: 75,

  },
  {
    fecha: "Marzo",
    Enfermedad: "Deficiente Potasio",
    Impacto: "Medio",
    Descripcion: "Agregar fertilizante con potasio.",
    Confiabilidad: 85,

    
  },
];

const fechas = [
  { nombre: "Enero", dia: 1 },
  { nombre: "Febrero", dia: 28 },
  { nombre: "Marzo", dia: 2 }, // Añadido Marzo para que coincida con los datos
  { nombre: "Abril", dia: 2 }, // Añadido Marzo para que coincida con los datos
];


const DiseaseTable = ({ data }) => {

  console.log("Info entrada para la tabla",data)

  return (
    <div>
      {data.length > 0 ? (    
        

        <table className="  bg-white">
          <thead>
            <tr>
              <th className=" border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Enfermedad</th>
              <th className=" border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Impacto</th>
              <th className=" border-r-[#A0AEC0] border-r border-solid text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light">Descripción</th>
              <th className=" px-2 text-[rgba(0,0,0,0.40)] text-center text-[-16px] font-light"> Confiabilidad</th>
            </tr>
          </thead>
          <tr className="h-2"></tr> {/* Espaciador */}
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Enfermedad}</td>
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Impacto}</td>
                <td className="px-4 py-2 border-r-[#A0AEC0] border-r border-solid">{entry.Descripcion}</td>
                <td className="px-4 py-2">{entry.Confiabilidad}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay enfermedades.</p>
      )}
    </div>
  );
};






const HealthStatus = () => {

  //Lo siguientee se usara para mostrar y ocultar la informacion a mostrar
  //RAUL: Aquí se usa un hook de estado para manejar si el componente está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  const toggleArticle = () => {
    setIsOpen(!isOpen);
  };


  //Lo siguiente se usara para seleccionar la fecha elegida
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  //Y poder filtrar la informacion de enfermedades a partir de la fecha seleccionada
  const filteredData = data.filter(entry => {
    const [entryMonth] = entry.fecha.split(' ');
    console.log("Mes con los que se cuenta",entryMonth)
    return entryMonth === selectedMonth;
  });

  

  //console.log(filteredData)
  console.log("Mes seleciconado",selectedMonth)
  console.log("info original",data)


  return (

    <div>
    <div className=" mb-4 cursor-pointer" onClick={toggleArticle}>
      <h2 className="flex items-center border-b-2 border-[#A0AEC0]  text-black text-[32px] font-light leading-[150%]">
          <img src={img1} className="h-8 w-8 mr-2" />
            Estado de Salud      
      </h2>
        
      </div>
      {isOpen && (//RAUL: Aquí se usa un operador ternario para mostrar el contenido si isOpen es true y ve a la linea 86. Lo impotantees que englobe toda la section que estes trabajando
        <section className="mb-4">
        
  
          <div className="bg-white border-b-[5px] border-b-[#95C11F] border-solid; py-2">
            <div name='a' className='grid grid-cols-2 gap-4  border-gray-400  '>
              <div className="p-4 bg-white border-r-2 border-[#A0AEC0]">
  
                <h3 className="text-[20px] font-light border-b-2 border-[#A0AEC0] ">
                  Actualidad
                </h3>
              
              
                <p className="text-[rgba(0,0,0,0.40)] text-center text-xl font-normal leading-[330%]">No hay enfermedades</p>
              </div>
            
              <div className="p-4 bg-white">
  
                <h4 className="text-[20px] font-light border-b-2 border-[#A0AEC0]">Predicciones</h4>
              
              
                <div className="gap-4 ">
                
                  <select id="month-select" value={selectedMonth} onChange={handleChange} className="ml-2 border p-1">
                
                    <option value="Periodo">Elige un mes-</option>
                    {fechas.map((fecha) => (
                      <option key={fecha.mes} value={fecha.mes}>
                        {fecha.nombre}
                      </option>
                      ))
                    }
                  </select>
                  <span className="ml-4">Confiabilidad: 12%</span>
                  {selectedMonth && (
                    <div className="mt-4">
                      <DiseaseTable data={filteredData}/>
                    </div>
                  )}
              
              
                
              </div>
              
              
             
            </div>


          </div>
        </div>
  
        
      
      </section> 
      )}
    </div>

  );
};

export default HealthStatus;
