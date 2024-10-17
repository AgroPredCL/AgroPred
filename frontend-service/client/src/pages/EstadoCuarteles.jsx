import React, { useState } from 'react';
import { Seccion } from '@components/Seccion';
import CuartelSelector from '@components/estado-cuarteles/CuartelSelector';
import { renderCuartelDetails } from '@components/estado-Cuarteles/CuartelDetails';
import EstadoSuelo from '@components/estado-cuarteles/EstadoSuelo';
import SueloGraph from '@components/estado-cuarteles/SueloGraph';
import HydriclPredict from '@components/estado-cuarteles/prediccion-hidrica/PrediccionHidrica';
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

	const handleEdit = () => {
		console.log(`Editando el cuartel: ${selectedCuartel.nombre_Cuartel}`);
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
				{renderCuartelDetails(selectedCuartel, handleEdit)}
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

			{/* <Seccion titulo='Estado Hídrico'>
				<HydriclPredict />
			</Seccion> */}
		</>
	);
}
