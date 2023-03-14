import { Stack, Text, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-location';
import { useAuth } from '../../providers/auth-provider';

function Logout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout()
			.then(() => {
				navigate({ to: '/auth/login' });
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
			<Text size='lg' weight={500}>
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
