/* eslint-disable no-nested-ternary,react/jsx-props-no-spreading */
import { useForm } from '@mantine/form';
import { Button, PasswordInput, Stack } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

function Recovery() {
	const params = useParams();
	const navigate = useNavigate();
	const { updateRecovery } = useAuth();
	const { userId, secret } = params;

	const form = useForm({
		initialValues: {
			password: '',
			repeatPassword: '',
		},

		validate: (values) => ({
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
		validateInputOnBlur: ['password', 'repeatPassword'],
	});

	const handleRecovery = async () => {
		console.log('userId', userId);
		console.log('secret', secret);
		await updateRecovery(userId, secret, form.values.password, form.values.repeatPassword);
		navigate('/');
	};

	return (
		<form onSubmit={form.onSubmit(handleRecovery)} noValidate>
			<Stack>
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
				<Button fullWidth mt='xl' type='submit'>
					Войти
				</Button>
			</Stack>
		</form>
	);
}

export default Recovery;
