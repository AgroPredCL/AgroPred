import PropTypes from 'prop-types';

export const CustomInput = ({
	id,
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
}) => (
	<div className='space-y-2'>
		<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
			{label}
		</label>
		<input
			id={id}
			name={id}
			type={type}
			value={value}
			onChange={onChange}
			className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
			placeholder={placeholder}
		/>
	</div>
);

CustomInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.node.isRequired, // Cambia string a node
	type: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Acepta números y strings
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};

export const CustomButton = ({
	children,
	type = 'button',
	className,
	...props
}) => (
	<button
		type={type}
		className={`px-4 py-2 bg-predSecondary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${className}`}
		{...props}
	>
		{children}
	</button>
);

CustomButton.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string,
	className: PropTypes.string,
};
