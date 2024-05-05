import { Center, Group, Loader, Stack, Text, Anchor, Box } from '@mantine/core';
import { ReactNode, useState } from 'react';

interface LoadingScreenProps {
  title: string;
  icon: ReactNode;
}

function LoadingScreen({ title, icon }: LoadingScreenProps) {
  const [showGoHome, setShowGoHome] = useState(false);

  // Перейти на главную
  setTimeout(() => {
    setShowGoHome(true);
  }, 4000);

  return (
    <Center h="100vh">
      <Stack align="center" ta="center">
        <Loader variant="bars" color="indigo" />
        <Box>
          <Text size="xs" tt="uppercase" fw={700}>
            Загрузка...
          </Text>
          <Group gap="xs">
            {icon}
            <Text size="xl">{title}</Text>
          </Group>
          {showGoHome && (
            <Anchor href="/" target="_self">
              Перейти на главную
            </Anchor>
          )}
        </Box>
      </Stack>
    </Center>
  );
}

export default LoadingScreen;
