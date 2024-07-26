/* eslint-disable no-nested-ternary,react/jsx-props-no-spreading */
import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

function ForgotPassword() {
	const { createRecovery } = useAuth();
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: '',
		},

		validate: (values) => ({
			email: !values.email
				? 'Введите электронную почту'
				: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
				? null
				: 'Неверный формат электронной почты',
		}),

		validateInputOnBlur: ['email', 'password'],
	});

	const handleLogin = async () => {
		await createRecovery(form.values.email);
		navigate('/auth/confirm-email');
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
				<Button fullWidth mt='xl' type='submit'>
					Восстановить пароль
				</Button>
			</Stack>
		</form>
	);
}

export default ForgotPassword;
