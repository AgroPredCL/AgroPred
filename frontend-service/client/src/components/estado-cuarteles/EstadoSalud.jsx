import { Table } from '@components/estado-cuarteles/TableSalud';
import React, { useState } from 'react';
import  UploadImage  from '@components/Subir_imagen/ImageUploader';
import { useGetPrediccionEnfermedadesQuery } from '@services/apiSliceModelos';

function Convert_Array(data) {
    let fechas = [];
    // Recorrer el objeto y extraer las fechas
    for (let i = 0; i < data.length; i++) {
        fechas.push(data[i].fecha);
    }
    return fechas;
  }
  


function formatDataForChart(apiData) {
    return Object.entries(apiData).map(([fecha, valor]) => ({
        fecha: fecha, // Fecha como etiqueta
        valor: valor, // Valor correspondiente a la fecha
    }));
};  

export default function HeathState({ cuartel }){
    const [predictedData, setpPredictedData] = useState(null);

    

    // Datos de ejemplo para enfermedades actuales y predicciones
	const actualidad = [
	
	];

	const predicciones = [
		{
			fecha: 'Enero',
			Enfermedad: 'Asfixia Radicular',
			Impacto: 'Alto',
			Descripcion: 'Aparece en condiciones de alta humedad.',
			Confiabilidad: 85,
			Recomendaciones: 'No aplicar riego en exceso y usar emisores de similar audal en el sector',
		},
	];

	const fechass = [
		{ nombre: 'Enero', dia: 1 },
		{ nombre: 'Febrero', dia: 28 },
		{ nombre: 'Marzo', dia: 2 },
	];

    const prediccion = useGetPrediccionEnfermedadesQuery(cuartel);
     
    //console.log("pobando",prediccion)
    //setpPredictedData(formatDataForChart(prediccion));
    //const fecha = Convert_Array(predictedData);

    return (
        <article className='pt-2'>
            <UploadImage/>
            <br></br>
			<h2 className='text-xl font-semibold text-gray-700 mb-4'>
				Enfermedades
			</h2>
				
			{/* Tabla de predicciones con filtro de fechas */}
			<Table
				actualidad={actualidad}
				predicciones={predicciones}
				fechas={fechass}
			/>
		</article>
    );
}