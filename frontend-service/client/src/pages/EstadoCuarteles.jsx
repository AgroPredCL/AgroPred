import { Seccion } from '../components/UI/Seccion';
import { fetchData } from '../../fetchData';
import { Table } from '../components/estado_salud/Table';
import { Estado } from '../components/nutricion/Estado';
import { Caracteristica } from '../components/nutricion/Caracteristica';
import NutritionalPredict from '../components/prediccion_nutrientes/NutritionalPredict';
import UploadImage from '../components/Subir_imagen/ImageUploader';

const apiUrl = import.meta.env.VITE_API_URL;

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

// Usar URL dinámica para las peticiones API
const apiRecomendaciones = fetchData(`${apiUrl}/recomendacion/fertilizante`);
const apiDataFechaLimite = fetchData(`${apiUrl}/fechasLimite`);
const apiDataNitrogeno = fetchData(`${apiUrl}/state/nitrogeno`);
const apiDataPotasio = fetchData(`${apiUrl}/state/potasio`);
const apiDataFosforo = fetchData(`${apiUrl}/state/fosforo`);
const apiDataHumedad = fetchData(`${apiUrl}/state/humedad`);
const apiDataConductividad = fetchData(`${apiUrl}/state/conductividad`);
const apiDataTemperatura = fetchData(`${apiUrl}/state/temperatura`);
const apiDataPh = fetchData(`${apiUrl}/state/ph`);

export default function EstadoCuarteles() {
    const dataRecomendaciones = apiRecomendaciones.read();
    const dataFechaLimite = apiDataFechaLimite.read();
    const dataNitrogeno = apiDataNitrogeno.read();
    const dataPotasio = apiDataPotasio.read();
    const dataFosforo = apiDataFosforo.read();
    const dataHumedad = apiDataHumedad.read();
    const dataConductividad = apiDataConductividad.read();
    const dataTemperatura = apiDataTemperatura.read();
    const dataPh = apiDataPh.read();

    const colores = {
        nitrogeno: 'bg-blue-100',
        potasio: 'bg-green-100',
        fosforo: 'bg-yellow-100',
    };

    return (
        <>
            <UploadImage />
            <Seccion titulo='Estado de Salud'>
                <article className="pt-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Enfermedades</h2>
                    <div className='grid grid-cols-2 gap-4 pb-4'>
                        <Table titulo='Actualidad' data={[]} fechas={[]} />
                        <Table titulo='Predicciones' filtro={true} data={data} fechas={fechas} />
                    </div>
                </article>

                <article className="mt-6 pt-2 border-t-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recomendación de Fertilizantes</h2>
                    <div className="flex justify-between flex-wrap">
                        {dataRecomendaciones && Object.entries(dataRecomendaciones).length > 0 ? (
                            Object.entries(dataRecomendaciones).map(([elemento, recomendacion], index) => (
                                <div key={index} className="w-full md:w-1/3 lg:w-1/4 p-2">
                                    <div className={`p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow h-full ${colores[elemento] || 'bg-gray-100'}`}>
                                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{elemento}</h3>
                                        <p className="text-gray-600 mt-2">{recomendacion}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No data available.</p>
                        )}
                    </div>
                </article>
                
            </Seccion>

            <Seccion titulo='Estado del suelo' actualizacion='Última lectura' ultimaLectura={dataFechaLimite?.fechaFin}>
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

            <Seccion titulo='Estado Nutricional'>
                <NutritionalPredict />
            </Seccion>
        </>
    );
}
