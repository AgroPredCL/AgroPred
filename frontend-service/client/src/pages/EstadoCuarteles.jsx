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
		nombre_Cuartel: 'p9s9',
		nom_predio: 'El Roble',
		area: 1000,
		cant_paltos: 100,
		caudal_emisor: 0.7,
		coeficiente_uniformidad: 0.7,
		eficiencia_riego: 0.7,
		factor_area_sombreada: 0.7,
		marco_plantacion: 0.2,
		numero_emisores_planta: 1,
		piedras_perfil_suelo: 0.7,
		porcentaje_suelo_emisores: 0.7,
		profundidad_raices: 0.7,
		retencion_agua_suelo: 0.7,
		tipo_planta: 'Palta Hass',
		umbral_riego: 0.7,
		createdAt: '2024-11-13T00:11:46.746Z',
		updatedAt: '2024-11-13T00:11:46.746Z',
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
				<HeathState cuartel={selectedCuartel.nombre_Cuartel} />

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
