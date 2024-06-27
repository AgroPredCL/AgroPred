import React, { useEffect, useState } from 'react';
import { Seccion } from './components/UI/Seccion';
import { Table } from './components/estado_salud/Table';
import { Estado } from './components/nutricion/Estado';
import { Caracteristica } from './components/nutricion/Caracteristica';
import NutritionalPrediction from './components/NutritionalPrediction'; // Importar NutritionalPrediction
import { fetchData } from './components/apiservice';

const dataPredeterminada = [
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

const fechasPredeterminadas = [
    { nombre: "Enero", dia: 1 },
    { nombre: "Febrero", dia: 28 },
    { nombre: "Marzo", dia: 2 },
    { nombre: "Abril", dia: 2 },
];

export function App() {
    const [fecha, setFecha] = useState('');
    const [enfermedades, setEnfermedades] = useState([]);
    const [data, setData] = useState(dataPredeterminada);
    const [fechas, setFechas] = useState(fechasPredeterminadas);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData("/diseases?image_number=0005");
                console.log("Resultado de la API: ", result);
                setFecha(result.fecha);
                setEnfermedades(result.enfermedades);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <Seccion titulo='Estado de Salud'>
                <div className='grid grid-cols-2 gap-4'>
                    <Table titulo='Actualidad' data={enfermedades} fechas={[]} />
                    <Table titulo='Predicciones' filtro={true} data={data} fechas={fechas} confiabilidad='12' />
                </div>
            </Seccion>

            <Seccion titulo='Estado Nutricional' actualizacion='Última lectura' ultimaLectura='24 junio 2024, 06:00'>
                <div className="flex space-x-2 py-2 text-sm">
                    <Estado estado='Deficiente' valor='Deficiente' />
                    <Estado estado='Bajo' valor='Bajo' />
                    <Estado estado='Adecuado' valor='Adecuado' />
                    <Estado estado='Alto' valor='Alto' />
                    <Estado estado='Excesivo' valor='Excesivo' />
                </div>
                <div id="nutrientes" className="gap-8 py-2">
                    <Caracteristica titulo='Nitrógeno [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Fósforo [kg/ha]' estadoActual='Deficiente' valorActual='0.2' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                    <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                </div>
            </Seccion>

            <Seccion titulo='Predicción de Estado Nutricional'>
                <NutritionalPrediction /> {/* Integrar NutritionalPrediction */}
            </Seccion>
        </>
    );
}
