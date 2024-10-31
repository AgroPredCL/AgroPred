import React from 'react';
import PropTypes from 'prop-types';

const FieldTypeIndicator = ({ type }) => (
	<span
		className={`ml-1 px-2 py-1 text-xs font-semibold rounded ${
			type === 'number'
				? 'text-blue-800'
				: type === 'text'
					? 'text-green-800'
					: type === 'date'
						? 'text-purple-800'
						: 'text-orange-800'
		}`}
		aria-label={
			type === 'number'
				? 'Campo numérico'
				: type === 'text'
					? 'Campo de texto'
					: type === 'date'
						? 'Campo de fecha'
						: 'Campo de fecha y hora'
		}
	>
		{type === 'number'
			? '#'
			: type === 'text'
				? 'Aa'
				: type === 'date'
					? '📅'
					: '⏰'}
	</span>
);

FieldTypeIndicator.propTypes = {
	type: PropTypes.oneOf(['number', 'text', 'date', 'datetime']).isRequired,
};

export default FieldTypeIndicator;
