import { Seccion } from './Seccion';
import { Estado } from '../nutricion/Estado';
import { Caracteristica } from '../nutricion/Caracteristica';

export function Nutricion() {
    return (
        <>
        <Seccion titulo='Estado Nutricional' actualizacion='Última lectura' ultimaLectura='24 junio 2024, 06:00'>
            <div className="flex space-x-2 py-2 text-sm">
                <Estado estado='Deficiente' valor='Deficiente' />
                <Estado estado='Bajo' valor='Bajo' />
                <Estado estado='Adecuado' valor='Adecuado' />
                <Estado estado='Alto' valor='Alto' />
                <Estado estado='Excesivo' valor='Excesivo' />
            </div>
            <div id="nutrientes" className="gap-8 columns-4 py-2">
                <Caracteristica titulo='Nitrógeno [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Fósforo [kg/ha]' estadoActual='Deficiente' valorActual='0.2' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
                <Caracteristica titulo='Potasio [kg/ha]' estadoActual='Adecuado' valorActual='0.8' estadoPromedio='Adecuado' valorPromedio='0.8' />
            </div>
        </Seccion>
        </>
        
    );
}
