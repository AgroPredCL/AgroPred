import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@utils/Utils';
import { CustomButton } from '@components/UI';

export default function CuartelSelector({ cuarteles, onSelectCuartel }) {
	// Agregamos la opción de "Vista General" al inicio de la lista
	const opcionesCuarteles = [{ nombre_Cuartel: 'Vista General' }, ...cuarteles];

	const [isOpen, setIsOpen] = useState(false);
	const [selectedCuartel, setSelectedCuartel] = useState(opcionesCuarteles[0]);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = cuartel => {
		setSelectedCuartel(cuartel);
		setIsOpen(false);
		onSelectCuartel(cuartel); // Notificamos al componente padre del cambio
	};

	return (
		<div className='flex items-center justify-between space-x-4'>
			<div className='flex items-center space-x-2 relative'>
				<h2 className='text-lg font-semibold'>Selecciona el cuartel</h2>
				<div className='relative'>
					<button
						onClick={toggleDropdown}
						className='flex items-center justify-between w-64 px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
						aria-haspopup='listbox'
						aria-expanded={isOpen}
					>
						<span className='block truncate'>
							{selectedCuartel?.nombre_Cuartel || 'Seleccionar cuartel'}
						</span>
						<ChevronDown
							className={cn(
								'w-5 h-5 text-gray-400',
								isOpen && 'transform rotate-180'
							)}
						/>
					</button>

					{isOpen && (
						<ul
							className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
							role='listbox'
						>
							{opcionesCuarteles.map(cuartel => (
								<li
									key={cuartel.nombre_Cuartel}
									className={cn(
										'cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-gray-900'
									)}
									role='option'
									onClick={() => handleSelect(cuartel)}
								>
									<span className='block truncate'>
										{cuartel.nombre_Cuartel}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<a href='/crear-cuartel'>
				<CustomButton type='submit' className='flex items-center'>
					<Plus className='w-5 h-5 mr-2' />
					Añadir cuartel
				</CustomButton>
			</a>
		</div>
	);
}

CuartelSelector.propTypes = {
	cuarteles: PropTypes.arrayOf(
		PropTypes.shape({
			nombre_Cuartel: PropTypes.string.isRequired,
		})
	).isRequired,
	onSelectCuartel: PropTypes.func.isRequired,
};
