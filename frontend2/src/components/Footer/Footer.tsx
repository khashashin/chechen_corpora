import {
  Container,
  Stack,
  Anchor,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import BrandLogo from 'src/components/Header/BrandLogo';

const { VITE_APP_VERSION } = import.meta.env;

const links = [
  {
    link: 'mailto:info@dosham.info',
    label: 'Написать нам: info@dosham.info',
  },
  {
    link: `https://github.com/khashashin/chechen_corpora/commit/${VITE_APP_VERSION}`,
    label: `Version: ${VITE_APP_VERSION}`,
  },
];

function Footer() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isXs = useMediaQuery('(max-width: 36em');

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      target="_blank"
      key={link.label}
      href={link.link}
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
      <Stack
        style={{
          marginTop: isXs ? theme.spacing.md : 0,
        }}
      >
        {items}
      </Stack>
    </Container>
  );
}

export default Footer;
