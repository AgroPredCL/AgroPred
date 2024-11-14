import { Table } from '@components/estado-cuarteles/TableSalud';
import React, { useState, useEffect } from 'react';
import UploadImage from '@components/Subir_imagen/ImageUploader';
import { useGetPrediccionEnfermedadesQuery } from '@services/apiSliceModelos';

export default function HeathState({ cuartel }) {
   
    
    const { data: apiData } = useGetPrediccionEnfermedadesQuery(cuartel);

    
    const actualidad = [
        // Tus datos de enfermedades actuales
    ];


    return (
        <article className='pt-2'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="ml-4">
                <UploadImage name="fruta"/>

                </div>

                <div>
                <UploadImage name="hoja"/>
                </div>
            </div>
           
            <br />
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>
                Enfermedades
            </h2>
                
            {/* Tabla de predicciones con filtro de fechas */}
            <Table
                actualidad={actualidad}
                predicciones={apiData}
                nombreCuartel={cuartel}
            />
        </article>
    );
}
