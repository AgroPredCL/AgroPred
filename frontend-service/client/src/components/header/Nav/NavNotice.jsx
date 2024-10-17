import { useState } from 'react';
import { Bell, CircleAlert } from 'lucide-react';
import PropTypes from 'prop-types';

export default function NavNotice() {
	const [isNoticeOpen, setIsNoticeOpen] = useState(false);

	const toggleNotice = () => setIsNoticeOpen(!isNoticeOpen);

	return (
		<li className='relative'>
			<button
				onClick={toggleNotice}
				className='p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200'
				aria-label='Notifications'
			>
				<Bell className='h-6 w-6 text-gray-500' />
				<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-predSecondary transform translate-x-0 -translate-y-1 bg-primary rounded-full'>
					4
				</span>
			</button>
			{isNoticeOpen && <NotificationsDropdown />}
		</li>
	);
}

const NotificationsDropdown = () => (
	<div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200'>
		<div className='px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
			<span className='font-semibold text-gray-700'>
				Tienes 4 Notificaciones
			</span>
			<a href='#' className='text-sm text-primary hover:text-primary-dark'>
				Ver todas
			</a>
		</div>
		<ul>
			<NotificationItem
				icon={<CircleAlert className='h-6 w-6 text-yellow-500' />}
				title='Lorem Ipsum'
				description='Esto es un ejemplo'
				time='30 min. ago'
			/>
			<NotificationItem
				icon={<CircleAlert className='h-6 w-6 text-green-500' />}
				title='Nuevo Usuario'
				description='Se ha registrado un nuevo usuario'
				time='1 hora ago'
			/>
			<NotificationItem
				icon={<CircleAlert className='h-6 w-6 text-red-500' />}
				title='Alerta de Servidor'
				description='Alto uso de CPU detectado'
				time='2 horas ago'
			/>
		</ul>
		<div className='px-4 py-2 border-t border-gray-200 text-center'>
			<a href='#' className='text-sm text-primary hover:text-primary-dark'>
				Ver todas las notificaciones
			</a>
		</div>
	</div>
);

const NotificationItem = ({ icon, title, description, time }) => (
	<li className='px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out border-b border-gray-200 last:border-b-0'>
		<div className='flex items-start'>
			<div className='flex-shrink-0'>{icon}</div>
			<div className='ml-3 w-0 flex-1'>
				<p className='text-sm font-medium text-gray-900'>{title}</p>
				<p className='mt-1 text-sm text-gray-500'>{description}</p>
				<p className='mt-1 text-xs text-gray-400'>{time}</p>
			</div>
		</div>
	</li>
);

NotificationItem.propTypes = {
	icon: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
};
