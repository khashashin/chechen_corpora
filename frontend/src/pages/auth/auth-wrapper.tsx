import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Container, Title, Text, Anchor, Paper } from '@mantine/core';
import { useNavigate, useRouter } from '@tanstack/react-location';
import { useAuth } from '../../providers/auth-provider';
import PublicHeader from '../../components/header/public-header';

type AuthWrapperProps = {
	children: ReactNode;
};

function AuthWrapper({ children }: AuthWrapperProps) {
	const [title, setTitle] = useState('Вход в систему');
	const [subtitle, setSubtitle] = useState('У вас еще нет учетной записи?');
	const [linkText, setLinkText] = useState('Создать учетную запись');
	const [linkTo, setLinkTo] = useState('/auth/register');
	const router = useRouter();
	const navigate = useNavigate();

	const {
		state: {
			location: { pathname },
		},
	} = router;

	const { isAuthenticated } = useAuth();

	const handleRedirect = useCallback(() => {
		if (isAuthenticated) {
			navigate({ to: '/auth/logout' });
		} else {
			navigate({ to: '/auth/login' });
		}
	}, [isAuthenticated, navigate]);

	const handleLinkOnClick = useCallback(() => {
		navigate({ to: linkTo });
	}, [linkTo, navigate]);

	useEffect(() => {
		switch (pathname) {
			case '/auth/login':
				handleRedirect();
				setTitle('Вход в систему');
				setSubtitle('У вас еще нет учетной записи?');
				setLinkText('Создать учетную запись');
				setLinkTo('/auth/register');
				break;
			case '/auth/register':
				setTitle('Регистрация');
				setSubtitle('У вас уже есть учетная запись?');
				setLinkText('Войти в систему');
				setLinkTo('/auth/login');
				break;
			case '/auth/logout':
				handleRedirect();
				setTitle('Выход из системы');
				setSubtitle('Вы уверены, что хотите выйти из системы?');
				setLinkText('На главную');
				setLinkTo('/');
				break;
			case '/auth/forgot-password':
				setTitle('Восстановление пароля');
				setSubtitle('У вас уже есть учетная запись?');
				setLinkText('Войти в систему');
				setLinkTo('/auth/login');
				break;
			case '/auth/verify':
				setTitle('Подтверждение электронной почты');
				setSubtitle('');
				setLinkText('На главную');
				setLinkTo('/');
				break;
			case '/auth/recovery':
				setTitle('Сброс пароля');
				setSubtitle('Введите новый пароль');
				setLinkText('На главную');
				setLinkTo('/');
				break;
			default:
				handleRedirect();
				setTitle('Вход в систему');
				setSubtitle('У вас еще нет учетной записи?');
				setLinkText('Создать учетную запись');
				setLinkTo('/auth/register');
				break;
		}
	}, [pathname, handleRedirect]);

	return (
		<Container size='lg'>
			<PublicHeader />
			<Container size={400} mt={30}>
				<Title align='center' sx={{ fontWeight: 900 }}>
					{title}
				</Title>
				<Text color='dimmed' size='sm' align='center' mt={5}>
					{subtitle}{' '}
					<Anchor<'a'>
						size='sm'
						href={linkTo}
						onClick={(event) => {
							event.preventDefault();
							handleLinkOnClick();
						}}>
						{linkText}
					</Anchor>
				</Text>

				<Paper withBorder shadow='md' p={30} mt={30} radius='md'>
					{children}
				</Paper>
			</Container>
		</Container>
	);
}

export default AuthWrapper;
