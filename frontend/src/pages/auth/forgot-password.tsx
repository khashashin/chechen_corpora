/* eslint-disable no-nested-ternary,react/jsx-props-no-spreading */
import { Button, Stack, TextInput } from '@mantine/core';
import { useNavigate } from '@tanstack/react-location';
import { useForm } from '@mantine/form';
import { useAuth } from '../../providers/auth-provider';

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
		navigate({ to: '/auth/confirm-email' });
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
