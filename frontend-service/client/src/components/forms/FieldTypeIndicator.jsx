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
						: type === 'datetime'
							? 'text-orange-800'
							: type === 'email'
								? 'text-teal-800'
								: type === 'password'
									? 'text-red-800'
									: ''
		}`}
		aria-label={
			type === 'number'
				? 'Campo numérico'
				: type === 'text'
					? 'Campo de texto'
					: type === 'date'
						? 'Campo de fecha'
						: type === 'datetime'
							? 'Campo de fecha y hora'
							: type === 'email'
								? 'Campo de correo electrónico'
								: type === 'password'
									? 'Campo de contraseña'
									: ''
		}
	>
		{type === 'number'
			? '#'
			: type === 'text'
				? 'Aa'
				: type === 'date'
					? '📅'
					: type === 'datetime'
						? '⏰'
						: type === 'email'
							? '📧'
							: type === 'password'
								? '🔒'
								: ''}
	</span>
);

FieldTypeIndicator.propTypes = {
	type: PropTypes.oneOf([
		'number',
		'text',
		'date',
		'datetime',
		'email',
		'password',
	]).isRequired,
};

export default FieldTypeIndicator;
