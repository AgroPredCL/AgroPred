import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import PropTypes from 'prop-types';
import Nav from './Nav/Nav';

const Header = ({ toggleSidebar }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 h-16 ${
				isScrolled ? 'shadow-md' : ''
			}`}
		>
			<div className=' mx-auto px-4 sm:px-6 lg:px-8 h-full'>
				<div className='flex justify-between items-center h-full'>
					<div className='flex items-center'>
						<button
							onClick={toggleSidebar}
							className='mr-4 p-2 rounded-md lg:hidden'
							aria-label='Toggle sidebar'
						>
							<Menu size={24} />
						</button>
						<Logo />
					</div>
					<SearchBar />
					<Nav />
				</div>
			</div>
		</header>
	);
};

const Logo = () => (
	<div className='flex-shrink-0 flex items-center'>
		<img
			className='hidden md:block h-10 w-auto'
			src='/Logo-horizontal.png'
			alt='Logo AgroPred'
		/>
	</div>
);

const SearchBar = () => (
	<div className='flex-1 max-w-lg mx-4'>
		<div className='relative'>
			<input
				type='text'
				className='w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors duration-200'
				placeholder='Buscar...'
			/>
			<Search
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
				size={20}
			/>
		</div>
	</div>
);

Header.propTypes = {
	toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
