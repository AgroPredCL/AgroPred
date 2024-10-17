import React, { useState } from 'react';
import Header from './header/Header';
import PropTypes from 'prop-types';
import SideBar from './header/SideBar';

const Layout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className='min-h-screen flex flex-col'>
			<Header toggleSidebar={toggleSidebar} />
			<SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<main className='flex-grow pt-16 lg:pl-64'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					{children}
				</div>
			</main>
		</div>
	);
};
Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
