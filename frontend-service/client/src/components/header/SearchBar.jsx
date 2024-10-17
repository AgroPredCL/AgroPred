import './SearchBar.css';
import { Search } from 'lucide-react';

export default function SearchBar() {
	return (
		<div className='search-bar'>
			<form className='search-form flex items-center' method='POST' action='#'>
				<input
					type='text'
					name='query'
					placeholder='Buscar'
					title='Enter search keyword'
				/>
				<button type='submit' title='Search'>
					<Search />
				</button>
			</form>
		</div>
	);
}
