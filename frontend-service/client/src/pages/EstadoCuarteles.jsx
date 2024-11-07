import React, { useState } from 'react';
import { Seccion } from '@components/Seccion';
import CuartelSelector from '@components/estado-cuarteles/CuartelSelector';
import RenderCuartelDetails from '@components/estado-cuarteles/CuartelDetails';
import EstadoSuelo from '@components/estado-cuarteles/EstadoSuelo';
import SueloGraph from '@components/estado-cuarteles/SueloGraph';
import HydriclPredict from '@components/estado-cuarteles/prediccion-hidrica/PrediccionHidrica';
import HeathState from '@components/estado-cuarteles/EstadoSalud';
import FertilizerRecommendations from '@components/estado-cuarteles/FertilizerRecomendations';
import { formatearFechaHora } from '@adapters/dd-mm-yyyy';
import { useGetCuartelesQuery } from '@services/apiSliceGestion';
import { useGetFechasLimiteQuery } from '@services/apiSliceModelos';



export default function EstadoCuarteles() {
	const [selectedCuartel, setSelectedCuartel] = useState({
		nombre_Cuartel: 'Vista General',
	});

	const { data: cuarteles = [], isError, isLoading } = useGetCuartelesQuery();
	const { data: fechasLimite = [] } = useGetFechasLimiteQuery(
		selectedCuartel.nombre_Cuartel
	);

	const handleSelectCuartel = cuartel => {
		setSelectedCuartel(cuartel);
	};


	return (
		<>
			<div className='pb-6'>
				{isLoading ? (
					<p>Cargando...</p>
				) : isError ? (
					<p>Error al cargar los cuarteles</p>
				) : (
					<CuartelSelector
						cuarteles={cuarteles}
						onSelectCuartel={handleSelectCuartel}
					/>
				)}
			</div>

			<Seccion
				id='cuartel-details'
				titulo={
					selectedCuartel?.nombre_Cuartel === 'Vista General'
						? 'Información General del Predio'
						: `Información del Cuartel ${selectedCuartel?.nombre_Cuartel}`
				}
			>
				{console.log('Cuartel:', selectedCuartel)}
				{RenderCuartelDetails(selectedCuartel)}
			</Seccion>
			
			<Seccion titulo='Estado de Salud'>
				
				
				
<<<<<<< HEAD
				<article className='pt-2'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-44'>
						<h2 className='text-xl font-semibold text-gray-700 mb-4'>
							Enfermedades
						</h2>
					</div>
					{/* Tabla de predicciones con filtro de fechas */}
					<Table
						actualidad={actualidad}
						predicciones={predicciones}
						fechas={fechas}
					/>
				</article>
=======
				<HeathState cuartel={selectedCuartel.nombre_Cuartel}  />
>>>>>>> b3807d0f8798d9c70c34b535c361df4ad907d5be

				<FertilizerRecommendations cuartel={selectedCuartel.nombre_Cuartel} />
			</Seccion>

			<Seccion
				titulo='Estado del suelo'
				actualizacion='Última lectura'
				ultimaLectura={formatearFechaHora(fechasLimite?.fechaFin)}
			>
				<EstadoSuelo cuartel={selectedCuartel.nombre_Cuartel} />
			</Seccion>

			<Seccion titulo='Estado Nutricional'>
				<SueloGraph cuartel={selectedCuartel.nombre_Cuartel} />
			</Seccion>

			<Seccion titulo='Registro Histórico de Riego'>
				<HydriclPredict cuartel={selectedCuartel.nombre_Cuartel} />
			</Seccion>
		</>
	);
}