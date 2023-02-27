import { Stack, Text, Button } from '@mantine/core';
import { useNavigate } from '@tanstack/react-location';
import { useAuth } from '../../providers/auth-provider';

function Logout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate({ to: '/auth/login' });
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
