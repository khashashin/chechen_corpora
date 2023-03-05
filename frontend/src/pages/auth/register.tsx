/* eslint-disable react/jsx-props-no-spreading,no-nested-ternary */
import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-location';
import { useForm } from '@mantine/form';
import { useAuth } from '../../providers/auth-provider';

function Registration() {
	const { register } = useAuth();
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			password: '',
			repeatPassword: '',
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
			repeatPassword: !values.repeatPassword
				? 'Введите пароль еще раз'
				: values.repeatPassword !== values.password
				? 'Пароли не совпадают'
				: null,
		}),

		validateInputOnChange: ['repeatPassword'],
		validateInputOnBlur: ['email', 'password', 'repeatPassword'],
	});

	const handleRegister = async () => {
		register(form.values.email, form.values.password, form.values.name)
			.then(() => {
				navigate({ to: '/' });
				showNotification({
					id: 'registerSuccess',
					title: 'Успешная регистрация',
					message: 'Вы успешно зарегистрировались. Подтвердите свой аккаунт по ссылке в письме.',
					autoClose: 10000,
				});
			})
			.catch(() => {
				showNotification({
					id: 'registerError',
					title: 'Ошибка регистрации',
					message: 'Произошла ошибка при регистрации или пользователь с таким email уже существует',
					autoClose: 10000,
				});
			});
	};

	return (
		<form onSubmit={form.onSubmit(handleRegister)} noValidate>
			<Stack>
				<TextInput
					label='Имя и фамилия'
					placeholder='Введите ваше имя'
					{...form.getInputProps('name')}
				/>
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
				<PasswordInput
					label='Пароль еще раз'
					placeholder='Введите пароль еще раз'
					required
					{...form.getInputProps('repeatPassword')}
				/>
				<Anchor<'a'>
					onClick={(event) => {
						event.preventDefault();
						navigate({ to: '/auth/login' });
					}}
					href='/auth/login'
					size='sm'>
					Уже зарегистрированы?
				</Anchor>
				<Button fullWidth mt='xl' type='submit'>
					Зарегистрироваться
				</Button>
			</Stack>
		</form>
	);
}

export default Registration;
