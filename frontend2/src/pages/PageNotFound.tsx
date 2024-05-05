import { Box, Title, Text, Anchor } from '@mantine/core';

function PageNotFound() {
  return (
    <Box
      h="100vh"
      display="flex"
      p="xl"
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text fz="xl">404</Text>
      <Title order={1}>Страница не найдена</Title>
      <Text fz="md" px="md">
        Возможно, вы ошиблись при вводе адреса или страница была удалена.
      </Text>
      <Anchor href="/" c="blue" underline="always">
        Вернуться на главную
      </Anchor>
    </Box>
  );
}

export default PageNotFound;
