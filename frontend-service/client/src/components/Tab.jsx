import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ label, active, onClick }) => {
	return (
		<button
			className={`
        px-4 py-2 font-medium text-sm transition-colors duration-200
        ${
					active
						? 'bg-white text-agroSecondary border-t border-x border-gray-200'
						: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
				}
      `}
			onClick={onClick}
			aria-selected={active}
			role='tab'
		>
			{label}
		</button>
	);
};

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Tab;
