import { Center, Group, Loader, Stack, Text, Anchor, Box } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';
import {
  IconDeviceGamepad,
  IconFile3d,
  IconReportSearch,
  IconLivePhoto,
  IconRun,
  IconLanguage,
  IconBooks,
} from '@tabler/icons-react';

interface LoadingScreenProps {
  title: string;
  icon?: ReactNode | undefined;
}

function LoadingScreen({ title, icon = undefined }: LoadingScreenProps) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [showGoHome, setShowGoHome] = useState(false);

  const icons = [
    <IconDeviceGamepad />,
    <IconFile3d />,
    <IconReportSearch />,
    <IconLivePhoto />,
    <IconRun />,
    <IconLanguage />,
    <IconBooks />,
  ];

  // Перейти на главную
  setTimeout(() => {
    setShowGoHome(true);
  }, 4000);

  useEffect(() => {
    if (icon !== undefined) return undefined;

    const interval = setInterval(() => {
      setCurrentIconIndex((currentIndex) => (currentIndex + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [icon, icons.length]);

  const displayIcon = icon || icons[currentIconIndex];

  return (
    <Center h="100vh">
      <Stack align="center" ta="center">
        <Loader variant="bars" color="indigo" />
        <Box>
          <Text size="xs" tt="uppercase" fw={700}>
            Загрузка...
          </Text>
          <Group gap="xs">
            {displayIcon}
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

LoadingScreen.defaultProps = {
  icon: undefined,
};

export default LoadingScreen;
