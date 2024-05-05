import { useCallback, useEffect, useState } from 'react';
import { Container, Title, Text, Anchor, Paper } from '@mantine/core';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import Header from 'src/components/Header/Header';

function AuthWrapper() {
  const [title, setTitle] = useState('Вход в систему');
  const [subtitle, setSubtitle] = useState('У вас еще нет учетной записи?');
  const [linkText, setLinkText] = useState('Создать учетную запись');
  const [linkTo, setLinkTo] = useState('/auth/register');
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleRedirect = useCallback(async () => {
    if (isAuthenticated) {
      navigate('/auth/logout');
    } else {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLinkOnClick = useCallback(() => {
    navigate(linkTo);
  }, [linkTo, navigate]);

  useEffect(() => {
    switch (location.pathname) {
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
  }, [handleRedirect, location.pathname]);

  return (
    <Container size="lg">
      <Header />
      <Container size={400} mt={30}>
        <Title ta="center">{title}</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {subtitle}{' '}
          <Anchor<'a'>
            size="sm"
            href={linkTo}
            onClick={(event) => {
              event.preventDefault();
              handleLinkOnClick();
            }}
          >
            {linkText}
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Outlet />
        </Paper>
      </Container>
    </Container>
  );
}

export default AuthWrapper;
