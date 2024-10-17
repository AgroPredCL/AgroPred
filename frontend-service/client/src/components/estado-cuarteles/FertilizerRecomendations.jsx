import React from 'react';
import { Leaf, Zap, Droplet } from 'lucide-react';
import PropTypes from 'prop-types';
import { useGetRecomendacionFertilizanteQuery } from '@services/apiSliceModelos';

const FertilizerRecommendations = ({ cuartel }) => {
	const { data: dataRecomendaciones = {} } =
		useGetRecomendacionFertilizanteQuery(cuartel);

	const getIcon = elemento => {
		switch (elemento.toLowerCase()) {
			case 'nitrogeno':
				return <Leaf className='w-6 h-6' />;
			case 'potasio':
				return <Zap className='w-6 h-6' />;
			case 'fosforo':
				return <Droplet className='w-6 h-6' />;
			default:
				return null;
		}
	};

	const getColor = elemento => {
		switch (elemento.toLowerCase()) {
			case 'nitrogeno':
				return 'bg-green-100 text-green-800';
			case 'potasio':
				return 'bg-yellow-100 text-yellow-800';
			case 'fosforo':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<article className='mt-8 pt-6 border-t-2 border-gray-200'>
			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
				Recomendación de Fertilizantes
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Object.entries(dataRecomendaciones).map(
					([elemento, recomendacion], index) => (
						<div
							key={index}
							className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${getColor(elemento)}`}
						>
							<div className='flex items-center mb-4'>
								{getIcon(elemento)}
								<h3 className='text-lg font-semibold capitalize ml-2'>
									{elemento}
								</h3>
							</div>
							<p className='text-sm'>{recomendacion}</p>
						</div>
					)
				)}
			</div>
		</article>
	);
};

FertilizerRecommendations.propTypes = {
	cuartel: PropTypes.string.isRequired,
};

export default FertilizerRecommendations;
