import NavNotice from './NavNotice';
import NavAvatar from './NavAvatar';
import './nav.css';

export default function Nav() {
	return (
		<nav>
			<ul className='flex items-center space-x-4'>
				<NavNotice />
				<NavAvatar />
			</ul>
		</nav>
	);
}
