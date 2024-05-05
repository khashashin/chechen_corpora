import {
  Anchor,
  Box,
  Burger,
  Group,
  AppShell as MantineAppShell,
  useMantineColorScheme,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import BrandLogo from 'src/components/Header/BrandLogo';
import ColorSchemeToggle from 'src/components/Header/ColorSchemeToggle';
import AppNavigation from './AppNavigation';

function AppShell() {
  const { colorScheme } = useMantineColorScheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineAppShell
      padding="xl"
      styles={(theme) => ({
        main: {
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <MantineAppShell.Navbar>
        <AppNavigation />
      </MantineAppShell.Navbar>
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <BrandLogo />
          <Box style={{ marginLeft: 'auto' }}>
            <ColorSchemeToggle />
          </Box>
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Main>
        <Outlet />
      </MantineAppShell.Main>
      <MantineAppShell.Footer>
        <Group h="100%" px="md">
          <Box style={{ marginLeft: 'auto' }}>
            <Anchor
              c="dimmed"
              href="mailto:info@dosham.info"
              onClick={(event) => event.preventDefault()}
              size="sm"
            >
              Написать нам: info@dosham.info
            </Anchor>
          </Box>
        </Group>
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
}

export default AppShell;
