import { Stack, Text, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

function Logout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout()
			.then(() => {
				navigate('/auth/login');
				notifications.show({
					title: 'Успешный выход',
					message: 'Вы успешно вышли из аккаунта',
				});
			})
			.catch(() => {
				notifications.show({
					title: 'Ошибка выхода',
					message: 'Произошла ошибка при выходе',
				});
			});
	};

	return (
		<Stack>
			<Text size='lg' fw={500}>
				Вы авторизованы как:
			</Text>
			<Text>
				{user?.name} {user?.email}
			</Text>
			<Button onClick={handleLogout}>Выйти</Button>
		</Stack>
	);
}

export default Logout;
