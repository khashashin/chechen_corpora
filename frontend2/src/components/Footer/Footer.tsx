import {
  Container,
  Group,
  Anchor,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo } from 'react';
import BrandLogo from 'src/components/Header/BrandLogo';

const links = [
  {
    link: 'mailto:info@dosham.info',
    label: 'Написать нам: info@dosham.info',
  },
];

function Footer() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isXs = useMediaQuery('(max-width: 36em');

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        flexDirection: isXs ? 'column' : 'row',
        borderTop: `1px solid ${
          colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
      }}
    >
      <BrandLogo />
      <Group
        style={{
          marginTop: isXs ? theme.spacing.md : 0,
        }}
      >
        {items}
      </Group>
    </Container>
  );
}

export default memo(Footer);
