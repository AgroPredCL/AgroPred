import {
	Menu,
	Home,
	Users,
	Trees,
	Settings,
	LandPlot,
	CircleHelp,
} from 'lucide-react';
import { cn } from '@utils/Utils';

import PropTypes from 'prop-types';

const SideBar = ({ isOpen, toggleSidebar }) => {
	return (
		<>
			<button
				onClick={toggleSidebar}
				className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white'
				aria-label='Toggle sidebar'
			>
				<Menu size={24} />
			</button>
			<aside
				className={cn(
					'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200',
					isOpen ? 'translate-x-0' : '-translate-x-full',
					'lg:translate-x-0'
				)}
			>
				<div className='h-full px-3 py-4 overflow-y-auto'>
					<div className='mb-5 pb-5 border-b border-gray-200'>
						<img
							className='h-8 w-auto'
							src='/Logo-horizontal.png'
							alt='Company Logo'
						/>
					</div>
					<ul className='space-y-2 font-medium'>
						<SidebarItem icon={<Home size={24} />} text='Inicio' href='/' />
						<SidebarItem
							icon={<LandPlot size={24} />}
							text='Estado de Cuarteles'
							href='/estado-cuarteles'
						/>
						<SidebarItem
							icon={<Trees size={24} />}
							text='Gestión de Predio'
							href='/gestion-predio'
						/>
						<SidebarItem
							icon={<Users size={24} />}
							text='Gestión de Personal'
							href='/gestion-personal'
						/>
						<SidebarItem
							icon={<Settings size={24} />}
							text='Configuración'
							href='#'
						/>
						<SidebarItem
							icon={<CircleHelp size={24} />}
							text='Soporte'
							href='#'
						/>
					</ul>
				</div>
			</aside>
		</>
	);
};

const SidebarItem = ({ icon, text, href }) => (
	<li>
		<a
			href={href}
			className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'
		>
			{icon}
			<span className='ml-3'>{text}</span>
		</a>
	</li>
);

SidebarItem.propTypes = {
	icon: PropTypes.element.isRequired,
	text: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
};

SideBar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggleSidebar: PropTypes.func.isRequired,
};

export default SideBar;
