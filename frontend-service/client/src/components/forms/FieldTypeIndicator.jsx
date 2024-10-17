import React from 'react';
import PropTypes from 'prop-types';

const FieldTypeIndicator = ({ type }) => (
	<span
		className={`ml-1 px-2 py-1 text-xs font-semibold rounded ${
			type === 'number' ? 'text-blue-800' : 'text-green-800'
		}`}
		aria-label={type === 'number' ? 'Campo numérico' : 'Campo de texto'}
	>
		{type === 'number' ? '#' : 'Aa'}
	</span>
);

FieldTypeIndicator.propTypes = {
	type: PropTypes.oneOf(['number', 'text']).isRequired,
};

export default FieldTypeIndicator;
