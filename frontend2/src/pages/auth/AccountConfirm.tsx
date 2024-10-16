import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Stack, Text, Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

function AccountConfirm() {
  const params = useParams();
  const navigate = useNavigate();
  const { updateVerification } = useAuth();
  const { userId, secret } = params;

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
        <>
          <Text>Ваш аккаунт успешно подтвержден</Text>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </>
      )}
      {!isLoading && !isVerified && (
        <>
          <Text>Произошла ошибка при верификации</Text>
          <Button onClick={() => navigate('/')} mt={12}>
            На главную
          </Button>
        </>
      )}
    </Stack>
  );
}

export default AccountConfirm;
