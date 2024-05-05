import {
  Container,
  Text,
  ActionIcon,
  Group,
  Title,
  TextInput,
  useMantineTheme,
  Stack,
  Image,
  UnstyledButton,
} from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import image from 'assets/language-corpora_hero2.png';
import { Link, useNavigate } from 'react-router-dom';
import SearchHintWords from 'src/components/SearchHintWords/SearchHintWords';

import { useMediaQuery } from '@mantine/hooks';
import classes from './HeroSection.module.css';

type HeroSectionProps = {
  stats: any;
};

function HeroSection(props: HeroSectionProps) {
  const { stats } = props;
  const isMobile = useMediaQuery('(max-width: 755px)');
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleSearchActive = () => {
    return navigate('/search');
  };

  return (
    <Container size={700} className={classes.inner}>
      <Group
        wrap="nowrap"
        justify={isMobile ? 'center' : 'space-between'}
        style={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Image
          src={image}
          style={{
            marginRight: isMobile ? 0 : theme.spacing.md,
            width: isMobile ? '100%' : '180px',
          }}
        />
        <Stack>
          <Title order={1}>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'green', to: 'cyan' }}
              inherit
            >
              Корпус чеченского языка
            </Text>{' '}
            собранный на открытых источниках
          </Title>

          <Text fz="lg" color="dimmed">
            представительная коллекция текстов на чеченском языке,{' '}
            <UnstyledButton component={Link} to="/words">
              <u>{stats?.data.unique_words} уникальных форм</u>
            </UnstyledButton>{' '}
            и словосочетаний.
          </Text>
        </Stack>
      </Group>

      <Group className={classes.controls} gap={3}>
        <TextInput
          leftSection={<IconSearch size={24} />}
          size="lg"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              <IconArrowRight size={24} />
            </ActionIcon>
          }
          placeholder="Поиск по корпусу"
          rightSectionWidth={42}
          className={classes.control}
          onFocus={handleSearchActive}
          onClick={handleSearchActive}
        />
        <Text fz="xs">Введите слово или словосочетание для поиска</Text>
        <SearchHintWords />
      </Group>
    </Container>
  );
}

export default HeroSection;
