import {
  Group,
  ThemeIcon,
  UnstyledButton,
  Text,
  useMantineColorScheme,
  Box,
} from '@mantine/core';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArticle,
  IconBooks,
  IconCategory,
  IconLicense,
  IconNews,
  IconTextRecognition,
} from '@tabler/icons-react';

type MainLinkProps = {
  icon: ReactNode;
  color: string;
  label: string;
  to: string;
  id: string;
};

function MainLink({ icon, color, label, to, id }: MainLinkProps) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <UnstyledButton
      style={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      component={Link}
      to={to}
      id={id}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconTextRecognition size={16} />,
    color: 'blue',
    label: 'Создать',
    to: '/admin/upload',
    id: 'upload',
  },
  {
    icon: <IconBooks size={16} />,
    color: 'teal',
    label: 'Книги',
    to: '/admin/books',
    id: 'books',
  },
  {
    icon: <IconNews size={16} />,
    color: 'violet',
    label: 'Газеты и журналы',
    to: '/admin/newspapers',
    id: 'newspapers',
  },
  {
    icon: <IconArticle size={16} />,
    color: 'grape',
    label: 'Статьи и доклады',
    to: '/admin/articles',
    id: 'articles',
  },
  {
    icon: <IconLicense size={16} />,
    color: 'sky',
    label: 'Научные статьи',
    to: '/admin/scientific-articles',
    id: 'scientific-articles',
  },
  {
    icon: <IconCategory size={16} />,
    color: 'warning',
    label: 'Другое',
    to: '/admin/diverse-materials',
    id: 'diverseMaterials',
  },
];

function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

function AppNavigation() {
  return (
    <Box p="md">
      <Box mt="md">
        <MainLinks />
      </Box>
      <Box>
        <div>User</div>
      </Box>
    </Box>
  );
}

export default AppNavigation;
