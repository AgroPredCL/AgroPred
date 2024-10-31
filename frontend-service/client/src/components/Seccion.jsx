'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import { cn } from '@utils/Utils';

export function Seccion({ titulo, actualizacion, ultimaLectura, children }) {
	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<section className='mb-6 bg-white rounded-lg shadow-md overflow-hidden pb-4'>
			<div
				className='flex items-center justify-between p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
				onClick={toggleOpen}
				aria-expanded={isOpen}
				aria-controls={`section-content-${titulo}`}
			>
				<h2 className='text-xl font-semibold text-gray-800'>{titulo}</h2>
				<div className='flex items-center'>
					{actualizacion && (
						<p className='text-sm text-gray-500 mr-4'>
							<span className='font-medium'>{actualizacion}:</span>{' '}
							{ultimaLectura}
						</p>
					)}
					<ChevronDown
						className={cn(
							'h-6 w-6 text-gray-500 transition-transform duration-200',
							isOpen ? 'transform rotate-180' : ''
						)}
					/>
				</div>
			</div>

			<div
				id={`section-content-${titulo}`}
				className={cn(
					'px-4 py-2 transition-all duration-200 ease-in-out',
					isOpen ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
				)}
			>
				{children}
			</div>
		</section>
	);
}

Seccion.propTypes = {
	titulo: PropTypes.string.isRequired,
	actualizacion: PropTypes.string,
	ultimaLectura: PropTypes.string,
	children: PropTypes.node.isRequired,
};
