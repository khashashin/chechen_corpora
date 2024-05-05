import {
  Text,
  Title,
  Container,
  SimpleGrid,
  Paper,
  Group,
  Space,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Client, Databases, Query } from 'appwrite';
import { memo, useEffect, useMemo, useState } from 'react';
import logger from 'src/utils/logger';

const { VITE_AUTH_ENDPOINT, VITE_AUTH_PROJECT_ID } = import.meta.env;

const client = new Client();
client.setEndpoint(VITE_AUTH_ENDPOINT).setProject(VITE_AUTH_PROJECT_ID);

const databases = new Databases(client);

const log = logger('LastChanges');

type Notifications = {
  title: string;
  message: string;
  updateAt: string;
};

function LastChanges() {
  const theme = useMantineTheme();
  const isSm = useMediaQuery('(max-width: 755px)');
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const getNotifications = useMemo(async () => {
    return databases.listDocuments(
      '640dec564dd6addc5f2f',
      '640dec68e9ae407e09f5',
      [Query.orderDesc('$updatedAt'), Query.limit(4)],
    );
  }, []);

  useEffect(() => {
    (async () => {
      const messages = await getNotifications;
      const data = messages.documents.map((item) => {
        log.debug(item.$id);
        return {
          title: item.title,
          message: item.message,
          updateAt: item.$updatedAt,
        };
      });

      setNotifications(data);
    })();
  }, [getNotifications]);

  return (
    <Container
      style={{
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
      }}
    >
      <Title
        style={{ marginBottom: theme.spacing.md }}
        ta={isSm ? 'left' : 'center'}
      >
        Последние обновления
      </Title>

      <Container
        size={560}
        style={{
          display: 'flex',
          padding: 0,
          justifyContent: isSm ? 'flex-start' : 'center',
        }}
      >
        <Text size="sm">
          Описание событий, таких как: добавление новых функций, обновление
          старых, исправление ошибок и т.д.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        spacing={`calc(${theme.spacing.sm} * 2)`}
        cols={{ base: 1, md: 2, sm: 1 }}
      >
        {notifications.map((item, index) => (
          <Paper
            key={`${item.title}-${JSON.stringify(index)}`}
            withBorder
            p="lg"
            radius="md"
            shadow="md"
          >
            <Group justify="apart" mb="xs">
              <Text size="md" fw={500}>
                {item.title}
              </Text>
            </Group>
            <Text color="dimmed" size="xs">
              {item.message}
            </Text>
            <Space h="xs" />
            <Text fs="italic" color="dimmed" size="xs">
              Дата обновления:{' '}
              {new Date(item.updateAt).toLocaleDateString('ru-RU')}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default memo(LastChanges);
