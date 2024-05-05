import {
  Text,
  Title,
  Container,
  SimpleGrid,
  Paper,
  Group,
  Image,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import imageBooks from 'assets/books_icon.png';
import imageArticles from 'assets/articles_icon.png';
import newsPapers from 'assets/newspapers_icon.png';
import various from 'assets/various_icon.png';

const PaperData = [
  {
    title: 'Книги',
    image: imageBooks,
    count: 234,
    description: 'Всего книг в базе данных',
  },
  {
    title: 'Статьи',
    image: imageArticles,
    count: 345,
    description: 'Всего статей в базе данных',
  },
  {
    title: 'Газеты и журналы',
    image: newsPapers,
    count: 7345,
    description: 'Всего газет и журналов в базе данных',
  },
  {
    title: 'Остальное',
    image: various,
    count: 8123975,
    description: 'Данных без категории',
  },
];

type FeaturesSectionProps = {
  stats: any;
};

function FeaturesSection(props: FeaturesSectionProps) {
  const { stats } = props;
  const theme = useMantineTheme();
  const isSm = useMediaQuery('(max-width: 755px)');

  return (
    <Container>
      <Title component="h4" ta={isSm ? 'left' : 'center'}>
        Статистика по{' '}
        <span style={{ color: theme.colors.green[6] }}>проекту</span>
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" ta={isSm ? 'left' : 'center'}>
          Некоторые цифры, дающие представление о состоянии банка данных
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, md: 4, sm: 2 }}
        spacing={`calc(${theme.spacing.md} * 2)`}
      >
        {PaperData.map((item) => (
          <Paper
            key={item.title}
            withBorder
            p="md"
            radius="md"
            style={{
              position: 'relative',
            }}
          >
            <Group justify="apart">
              <Text c="dimmed" fw={700} component="h4">
                {item.title}
              </Text>
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
              {item.title === 'Книги' && <Text>{stats?.data.books}</Text>}
              {item.title === 'Остальное' && <Text>{stats?.data.diverse}</Text>}
              {item.title !== 'Книги' && item.title !== 'Остальное' && (
                <Text>{item.count}</Text>
              )}
            </Group>

            <Text size="xs" c="dimmed" mt={7}>
              {item.description}
            </Text>

            <Image
              src={item.image}
              style={{
                position: 'absolute',
                right: '16px',
                top: isSm ? 'auto' : '18px',
                bottom: isSm ? '16px' : 'auto',
                width: isSm ? '80px' : '70px',
              }}
            />
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default FeaturesSection;
