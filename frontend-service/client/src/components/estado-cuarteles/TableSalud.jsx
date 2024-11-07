import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from '@components/Tab';

const DiseaseTable = ({ data }) => {
	return (
		<div className='overflow-x-auto shadow-md rounded-lg'>
			{data.length > 0 ? (
				<table className='w-full bg-white'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Enfermedad
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Impacto
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Descripción
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Confiabilidad
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Recomendaciones
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{data.map((entry, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									{entry.Enfermedad}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{entry.Impacto}
								</td>
								<td className='px-6 py-4 text-sm text-gray-500'>
									{entry.Descripcion}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
									{entry.Confiabilidad}%
								</td>
								<td className='px-6 py-4 text-sm text-gray-500'>
									{entry.Recomendaciones}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='text-gray-500 text-center text-xl font-normal py-8'>
					No hay enfermedades
				</p>
			)}
		</div>
	);
};

DiseaseTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			Enfermedad: PropTypes.string.isRequired,
			Impacto: PropTypes.string.isRequired,
			Descripcion: PropTypes.string.isRequired,
			Confiabilidad: PropTypes.number.isRequired,
			Recomendaciones: PropTypes.string.isRequired,
		})
	).isRequired,
};
export function Table({ actualidad, predicciones, fechas }) {
	const [activeTab, setActiveTab] = useState('actualidad');
	const [selectedMonth, setSelectedMonth] = useState('');
	console.log("fechas",fechas)


	const handleTabChange = tab => {
		setActiveTab(tab);
		setSelectedMonth('');
	};

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value);
	};

	const filteredData =
		activeTab === 'predicciones' && selectedMonth
			? predicciones.filter(entry => entry.fecha === selectedMonth)
			: activeTab === 'predicciones'
				? predicciones
				: actualidad;

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden'>
			<div className='border-b border-gray-200'>
				<nav className='-mb-px flex' aria-label='Tabs'>
					<Tab
						label='Actualidad'
						active={activeTab === 'actualidad'}
						onClick={() => handleTabChange('actualidad')}
					/>
					<Tab
						label='Predicciones'
						active={activeTab === 'predicciones'}
						onClick={() => handleTabChange('predicciones')}
					/>
				</nav>
			</div>

			{activeTab === 'predicciones' && (
				<div className='px-4 py-3 border-b border-gray-200'>
					<select
						id='month-select'
						value={selectedMonth}
						onChange={handleMonthChange}
						className='block w-full px-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
					>
						<option value=''>Elige un mes</option>
						{fechas.map(fecha => (
							<option key={fecha}>
								{fecha}
							</option>
						))}
					</select>
				</div>
			)}

			<div className='p-4'>
				<DiseaseTable data={filteredData} />
			</div>
		</div>
	);
}

Table.propTypes = {
	actualidad: PropTypes.array.isRequired,
	predicciones: PropTypes.array.isRequired,
	fechas: PropTypes.arrayOf(
		PropTypes.shape({
			nombre: PropTypes.string.isRequired,
			dia: PropTypes.number.isRequired,
		})
	).isRequired,
};
