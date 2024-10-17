import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LineChart from '@components/LineChart';
import DataTable from '@components/DataTable';
import { CustomButton } from '@components/UI';

export function ArticleNutritional({ data, titleChart, children }) {
	const [viewMode, setViewMode] = useState('chart');

	return (
		<article className='bg-white rounded-lg shadow-sm overflow-hidden mb-4'>
			<div className='p-4'>
				<div className='flex items-center justify-between mb-4'>
					{children}
					<CustomButton
						onClick={() =>
							setViewMode(viewMode === 'chart' ? 'table' : 'chart')
						}
						className='ml-auto'
					>
						{viewMode === 'chart' ? 'Ver Tabla' : 'Ver Gráfico'}
					</CustomButton>
				</div>

				{viewMode === 'chart' ? (
					<LineChart data={data} title={titleChart} />
				) : (
					<DataTable data={data.map(({ ...rest }) => ({ ...rest }))} />
				)}
			</div>
		</article>
	);
}

ArticleNutritional.propTypes = {
	titulo: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	titleChart: PropTypes.string.isRequired,
	children: PropTypes.node,
};
