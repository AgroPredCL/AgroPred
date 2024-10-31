import { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';

export default function NavAvatar() {
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

	return (
		<li className='relative'>
			<button
				onClick={toggleProfile}
				className='flex items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200'
				aria-label='User menu'
			>
				<div className='bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center bg-predSecondary'>
					RC
				</div>
			</button>
			{isProfileOpen && <ProfileDropdown />}
		</li>
	);
}

const ProfileDropdown = () => (
	<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200'>
		<div className='px-4 py-2 border-b border-gray-200'>
			<p className='text-sm font-medium text-gray-900'>Raúl Cuello</p>
			<p className='text-xs text-gray-500'>Scrum Master</p>
		</div>
		<ul>
			<ProfileItem icon={<User className='h-5 w-5' />} text='Mi Perfil' />
			<ProfileItem
				icon={<Settings className='h-5 w-5' />}
				text='Configuración de Cuenta'
			/>
			<ProfileItem icon={<LogOut className='h-5 w-5' />} text='Cerrar Sesión' />
		</ul>
	</div>
);

const ProfileItem = ({ icon, text }) => (
	<li>
		<a
			href='#'
			className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out'
		>
			<div className='flex items-center'>
				<div className='flex-shrink-0'>{icon}</div>
				<div className='ml-3'>{text}</div>
			</div>
		</a>
	</li>
);

ProfileItem.propTypes = {
	icon: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
};
