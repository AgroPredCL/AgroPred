import { Table } from '@components/estado-cuarteles/TableSalud';
import React, { useState, useEffect } from 'react';
import UploadImage from '@components/Subir_imagen/ImageUploader';
import { useGetPrediccionEnfermedadesQuery } from '@services/apiSliceModelos';

function Convert_Array(data) {
    return data.map((item) => item.fecha);
}

export default function HeathState({ cuartel }) {
    const [fechas, setFechas] = useState([]);
    
    const { data: apiData } = useGetPrediccionEnfermedadesQuery(cuartel);

    useEffect(() => {
        if (apiData) {
            // Almacena las fechas en el estado fechas
            const fechasPrediccion = Convert_Array(apiData);
            setFechas(fechasPrediccion);
        }
    }, [apiData]);

    const actualidad = [
        // Tus datos de enfermedades actuales
    ];



    return (
        <article className='pt-2'>
            <UploadImage/>
            <br />
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>
                Enfermedades
            </h2>
                
            {/* Tabla de predicciones con filtro de fechas */}
            <Table
                actualidad={actualidad}
                predicciones={apiData}
                fechas={fechas}  // Pasar las fechas al componente de la tabla
            />
        </article>
    );
}
