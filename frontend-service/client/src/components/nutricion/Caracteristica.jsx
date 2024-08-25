import { Estado } from './Estado';

export function Caracteristica ({titulo, estadoActual, valorActual, estadoPromedio, valorPromedio}) {
    return (
        <div id={titulo.toLowerCase()}>
            <h2 className=" text-center border-b-2 border-gray-400">{titulo}</h2>
            <div className="border-b-2 border-gray-400">
                <div className="flex-grow flex items-center justify-between p-2">
                    <p>Valor Actual</p>
                    <Estado estado={estadoActual} valor={valorActual} />
                </div>
                <div className="flex-grow flex items-center justify-between p-2">
                    <p>Promedio del periodo</p>
                    <Estado estado={estadoPromedio} valor={valorPromedio} />
                </div>
            </div>
            <p className="text-sm text-right text-gray-500">Ver más</p>
        </div>
    );
}