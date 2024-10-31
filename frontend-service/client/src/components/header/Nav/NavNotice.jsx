import React, { useState } from 'react';
import { Bell, Snowflake } from 'lucide-react';
import PropTypes from 'prop-types';
import { useGetAlertaHeladaQuery } from '@services/apiSliceModelos';

export default function NavNotice() {
	const [isNoticeOpen, setIsNoticeOpen] = useState(false);

	const { data: apiData, error, isLoading } = useGetAlertaHeladaQuery();

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

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
					1
				</span>
			</button>
			{isNoticeOpen && <NotificationsDropdown apidata={apiData} />}
		</li>
	);
}

const NotificationsDropdown = ({ apidata }) => (
	<div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200'>
		<div className='px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
			<span className='font-semibold text-gray-700'>Notificaciones</span>
			{/* <a href='#' className='text-sm text-primary hover:text-primary-dark'>
				Ver todas
			</a> */}
		</div>
		<ul>
			<NotificationItem
				icon={<Snowflake className='h-6 w-6 text-blue-500' />}
				title='Alerta de helada'
				description={
					apidata
						? `Fecha de inicio: ${apidata.desde}\n
                Fecha de término: ${apidata.hasta}\n
                Duración: ${apidata.duracion} horas\n
                Temperatura mínima: ${apidata.minima}°C\n
                Temperatura promedio: ${apidata.promedio}°C`
						: 'No hay alerta'
				}
			/>
		</ul>
		{/* <div className='px-4 py-2 border-t border-gray-200 text-center'>
			<a href='#' className='text-sm text-primary hover:text-primary-dark'>
				Ver todas las notificaciones
			</a>
		</div> */}
	</div>
);

// Función para procesar el texto y agregar saltos de línea
const formatDescription = description => {
	return description
		.split('\n')
		.map((line, index) => <p key={index}>{line}</p>);
};

// Componente NotificationItem
const NotificationItem = ({ icon, title, description, time }) => (
	<li className='px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out border-b border-gray-200 last:border-b-0'>
		<div className='flex items-start'>
			<div className='flex-shrink-0'>{icon}</div>
			<div className='ml-3'>
				<span className='font-semibold text-gray-700'>{title}</span>
				<div className='text-sm text-gray-600'>
					{formatDescription(description)}
				</div>
				<p className='text-xs text-gray-400'>{time}</p>
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
