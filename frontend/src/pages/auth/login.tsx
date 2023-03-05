/* eslint-disable no-nested-ternary,react/jsx-props-no-spreading */
import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-location';
import { useForm } from '@mantine/form';
import { useAuth } from '../../providers/auth-provider';

function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			remember: false,
		},

		validate: (values) => ({
			email: !values.email
				? 'Введите электронную почту'
				: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
				? null
				: 'Неверный формат электронной почты',
			password: !values.password
				? 'Введите пароль'
				: values.password.length < 6
				? 'Пароль должен быть не менее 6 символов'
				: null,
		}),

		validateInputOnBlur: ['email', 'password'],
	});

	const handleLogin = async () => {
		login(form.values.email, form.values.password, form.values.remember)
			.then(() => {
				navigate({ to: '/' });
				showNotification({
					id: 'loginSuccess',
					title: 'Успешный вход',
					message: 'Вы успешно вошли в систему',
				});
			})
			.catch(() => {
				showNotification({
					id: 'loginError',
					title: 'Ошибка входа',
					message: 'Неверный логин или пароль',
				});
			});
	};

	return (
		<form onSubmit={form.onSubmit(handleLogin)} noValidate>
			<Stack>
				<TextInput
					label='Электронная почта'
					placeholder='example@mail.com'
					required
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					label='Пароль'
					placeholder='Введите пароль'
					required
					{...form.getInputProps('password')}
				/>
				<Group position='apart' mt='lg'>
					<Checkbox
						label='Запомнить меня'
						sx={{ lineHeight: 1 }}
						{...form.getInputProps('remember')}
					/>
					<Anchor<'a'>
						onClick={(event) => {
							event.preventDefault();
							navigate({ to: '/auth/forgot-password' });
						}}
						href='forgot-password'
						size='sm'>
						Забыли пароль?
					</Anchor>
				</Group>
				<Button fullWidth mt='xl' type='submit'>
					Войти
				</Button>
			</Stack>
		</form>
	);
}

export default Login;
