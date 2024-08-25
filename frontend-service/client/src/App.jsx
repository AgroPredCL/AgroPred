import { Seccion } from './components/UI/Seccion';
import { Table } from './components/estado_salud/Table';
import { Estado } from './components/nutricion/Estado';
import { Caracteristica } from './components/nutricion/Caracteristica';
import NutritionalPrediction from './components/NutritionalPrediction'; // Importar NutritionalPrediction

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
        Enfermedad: "Asfixia Radicular",
        Impacto: "Alto",
        Descripcion: "Aparece en condiciones de alta humedad.",
        Confiabilidad: 75,
    },
];

const fechas = [
    { nombre: "Enero", dia: 1 },
    { nombre: "Febrero", dia: 28 },
    { nombre: "Marzo", dia: 2 },
    { nombre: "Abril", dia: 2 },
];

export function App() {
    return (
        <>
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
                    <Caracteristica titulo='Nitrógeno [mg/kg]' estadoActual='Adecuado' valorActual='118.45' estadoPromedio='Alto' valorPromedio='126.39' />
                    <Caracteristica titulo='Potasio [mg/kg]' estadoActual='Bajo' valorActual='148.76' estadoPromedio='Excesivo' valorPromedio='178.37' />
                    <Caracteristica titulo='Fósforo [mg/kg]' estadoActual='Bajo' valorActual='44.37' estadoPromedio='Alto' valorPromedio='56.99' />
                    <Caracteristica titulo='Humedad (%)' estadoActual='Alto' valorActual='67.97' estadoPromedio='Alto' valorPromedio='69.71' />
                    <Caracteristica titulo='Conductividad Eléctrica [mS/cm]' estadoActual='Deficiente' valorActual='0.95' estadoPromedio='Deficiente' valorPromedio='1.00' />
                    <Caracteristica titulo='Temperatura [°C]' estadoActual='Adecuado' valorActual='23.53' estadoPromedio='Adecuado' valorPromedio='22.12' />
                    <Caracteristica titulo='pH' estadoActual='Adecuado' valorActual='6.32' estadoPromedio='Adecuado' valorPromedio='6.50' />
                </div>
            </Seccion>

            <Seccion titulo='Predicción de Estado Nutricional'>
                <NutritionalPrediction /> {/* Integrar NutritionalPrediction */}
            </Seccion>
        </>
    );
}
