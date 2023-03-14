import { useNavigate, useRouter } from '@tanstack/react-location';
import { notifications } from '@mantine/notifications';
import { memo, useEffect, useState } from 'react';
import { Paper, Stack, Text, Button } from '@mantine/core';
import { useAuth } from '../../providers/auth-provider';

function Verify() {
	const router = useRouter();
	const navigate = useNavigate();
	const { updateVerification } = useAuth();
	const { userId, secret } = router.state.location.search;

	const [isVerified, setIsVerified] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verify = async () => {
			await updateVerification(userId, secret);
			setIsVerified(true);
			setIsLoading(false);
		};
		verify().catch(() => {
			setIsLoading(false);
			notifications.show({
				title: 'Ошибка верификации',
				message: 'Произошла ошибка при верификации',
			});
		});
	}, [userId, secret, updateVerification]);

	return (
		<Stack>
			{isLoading && <Text>Подтверждение...</Text>}
			{isVerified && (
				<Paper>
					<Text>Ваш аккаунт успешно подтвержден</Text>
					<Button onClick={() => navigate({ to: '/' })}>На главную</Button>
				</Paper>
			)}
			{!isLoading && !isVerified && (
				<Paper
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Text>Произошла ошибка при верификации</Text>
					<Button onClick={() => navigate({ to: '/' })} mt={12}>
						На главную
					</Button>
				</Paper>
			)}
		</Stack>
	);
}

export default memo(Verify);
