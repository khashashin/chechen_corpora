import { Button, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function RecoveryEmailSent() {
  const navigate = useNavigate();
  return (
    <Stack>
      <Text>
        Если электронная почта существует, мы отправим вам письмо с инструкциями
        по восстановлению пароля.
      </Text>
      <Text>Пожалуйста, проверьте вашу почту.</Text>
      <Button onClick={() => navigate('/')} mt={12}>
        На главную
      </Button>
    </Stack>
  );
}

export default RecoveryEmailSent;
