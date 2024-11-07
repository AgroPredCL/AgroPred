import { Seccion } from '@components/Seccion';
import { CustomButton } from '@components/UI';
import { UserPlus, Users } from 'lucide-react';
import Agronomos from '@components/gestion-personal/Agronomos';
import Contratistas from '@components/gestion-personal/Contratistas';

export default function GestionPersonal() {
	return (
		<>
			<Seccion titulo='Gestión de Agrónomos'>
				<a href='crear-usuario'>
					<CustomButton type='submit' className='flex items-center mt-2 mb-4'>
						<UserPlus className='w-5 h-5 mr-2' />
						Crear Usuario
					</CustomButton>
				</a>
				<Agronomos />
			</Seccion>

			<Seccion titulo='Gestión de Contratistas'>
				<a href='crear-contratista'>
					<CustomButton type='submit' className='flex items-center mt-2 mb-4'>
						<Users className='w-5 h-5 mr-2' />
						Registrar Contratistas
					</CustomButton>
				</a>
				<Contratistas />
			</Seccion>
		</>
	);
}
