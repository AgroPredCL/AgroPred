import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/Utils';

const DataTable = ({ data }) => {
	// Obtener las fechas y horas únicas para la primera columna
	const fechas = data[0].data.map(entry => entry.fecha);
	const horas = data[0].data.map(entry => entry.hora);

	return (
		<div className='overflow-hidden rounded-lg shadow-md border border-gray-200'>
			<div className='overflow-x-auto'>
				<div className='overflow-y-auto max-h-96'>
					<table className='w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th
									scope='col'
									className='sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
								>
									Día
								</th>
								<th
									scope='col'
									className='sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
								>
									Hora
								</th>
								{data.map((entry, index) => (
									<th
										key={index}
										scope='col'
										className='sticky top-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										{entry.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{fechas.map((fecha, i) => (
								<tr
									key={i}
									className={cn(
										i % 2 === 0 ? 'bg-white' : 'bg-gray-50',
										'hover:bg-gray-100 transition-colors duration-200'
									)}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{fecha}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{horas[i]}
									</td>
									{data.map((entry, index) => (
										<td
											key={index}
											className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
										>
											{entry.data[i].valor}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

DataTable.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			data: PropTypes.arrayOf(
				PropTypes.shape({
					fecha: PropTypes.string.isRequired,
					hora: PropTypes.string.isRequired,
					valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
						.isRequired,
				})
			).isRequired,
		})
	).isRequired,
};

export default DataTable;
