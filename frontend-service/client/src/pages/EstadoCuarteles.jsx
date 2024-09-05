import { Seccion } from '../components/UI/Seccion';
import { fetchData } from '../../fetchData';
import { Table } from '../components/estado_salud/Table';
import { Estado } from '../components/nutricion/Estado';
import { Caracteristica } from '../components/nutricion/Caracteristica';
import NutritionalPredict from '../components/prediccion_nutrientes/NutritionalPredict';
import UploadImage from '../components/Subir_imagen/ImageUploader';

const data = [
    {
        fecha: "Enero",
        Enfermedad: "Antracnosis",
        Impacto: "Alto",
        Descripcion: "Aparece en condiciones húmedas y cálidas.",
        Confiabilidad: 55,
        Recomendaciones: "Aplicar fungicida."
    },
    {
        fecha: "Febrero",
        Enfermedad: "Asfixia Radicular",
        Impacto: "Alto",
        Descripcion: "Aparece en condiciones de alta humedad.",
        Confiabilidad: 75,
        Recomendaciones: "Mejorar el drenaje."
    },
];

const fechas = [
    { nombre: "Enero", dia: 1 },
    { nombre: "Febrero", dia: 28 },
    { nombre: "Marzo", dia: 2 },
    { nombre: "Abril", dia: 2 },
];

const apiDataNitrogeno = fetchData("http://127.0.0.1:8000/state/nitrogeno");
const apiDataPotasio = fetchData("http://127.0.0.1:8000/state/potasio");
const apiDataFosforo = fetchData("http://127.0.0.1:8000/state/fosforo");
const apiDataHumedad = fetchData("http://127.0.0.1:8000/state/humedad");
const apiDataConductividad = fetchData("http://127.0.0.1:8000/state/conductividad");
const apiDataTemperatura = fetchData("http://127.0.0.1:8000/state/temperatura");
const apiDataPh = fetchData("http://127.0.0.1:8000/state/ph");

export default function EstadoCuarteles() {
    const dataNitrogeno = apiDataNitrogeno.read();
    const dataPotasio = apiDataPotasio.read();
    const dataFosforo = apiDataFosforo.read();
    const dataHumedad = apiDataHumedad.read();
    const dataConductividad = apiDataConductividad.read();
    const dataTemperatura = apiDataTemperatura.read();
    const dataPh = apiDataPh.read();

    return (
        <>
            <UploadImage />
            <Seccion titulo='Estado de Salud'>

                <div className='grid grid-cols-2 gap-4'>
                    <Table titulo='Actualidad' data={[]} fechas={[]} />
                    <Table titulo='Predicciones' filtro={true} data={data} fechas={fechas} />
                </div>
            </Seccion>

            <Seccion titulo='Estado Nutricional' actualizacion='Última lectura' ultimaLectura='31 diciembre 2023, 21:00'>
                <div className="flex space-x-2 py-2 text-sm">
                    <Estado estado='Deficiente' valor='Deficiente' />
                    <Estado estado='Bajo' valor='Bajo' />
                    <Estado estado='Adecuado' valor='Adecuado' />
                    <Estado estado='Alto' valor='Alto' />
                    <Estado estado='Excesivo' valor='Excesivo' />
                </div>
                <div id="nutrientes" className="gap-8 py-2">
                    <Caracteristica 
                        titulo='Nitrógeno [mg/kg]' 
                        estadoActual={dataNitrogeno?.estadoActual} 
                        valorActual={dataNitrogeno?.valorActual} 
                        estadoPromedio={dataNitrogeno?.estadoPromedio} 
                        valorPromedio={dataNitrogeno?.valorPromedio} 
                    />
                    <Caracteristica
                        titulo='Potasio [mg/kg]'
                        estadoActual={dataPotasio?.estadoActual}
                        valorActual={dataPotasio?.valorActual}
                        estadoPromedio={dataPotasio?.estadoPromedio}
                        valorPromedio={dataPotasio?.valorPromedio}
                    />
                    <Caracteristica
                        titulo='Fósforo [mg/kg]'
                        estadoActual={dataFosforo?.estadoActual}
                        valorActual={dataFosforo?.valorActual}
                        estadoPromedio={dataFosforo?.estadoPromedio}
                        valorPromedio={dataFosforo?.valorPromedio}
                    />
                    <Caracteristica
                        titulo='Humedad (%)'
                        estadoActual={dataHumedad?.estadoActual}
                        valorActual={dataHumedad?.valorActual}
                        estadoPromedio={dataHumedad?.estadoPromedio}
                        valorPromedio={dataHumedad?.valorPromedio}
                    />
                    <Caracteristica
                        titulo='Conductividad Eléctrica [mS/cm]'
                        estadoActual={dataConductividad?.estadoActual}
                        valorActual={dataConductividad?.valorActual}
                        estadoPromedio={dataConductividad?.estadoPromedio}
                        valorPromedio={dataConductividad?.valorPromedio}
                    />
                    <Caracteristica
                        titulo='Temperatura [°C]'
                        estadoActual={dataTemperatura?.estadoActual}
                        valorActual={dataTemperatura?.valorActual}
                        estadoPromedio={dataTemperatura?.estadoPromedio}
                        valorPromedio={dataTemperatura?.valorPromedio}
                    />
                    <Caracteristica
                        titulo='pH'
                        estadoActual={dataPh?.estadoActual}
                        valorActual={dataPh?.valorActual}
                        estadoPromedio={dataPh?.estadoPromedio}
                        valorPromedio={dataPh?.valorPromedio}
                    />
                </div>
            </Seccion>

            <Seccion titulo='Análisis de datos histórico de Estado Nutricional'>
                <NutritionalPredict /> /* Integrar Dashboard 
            </Seccion>
        </>
    );
}
