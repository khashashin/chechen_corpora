import { Group, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import BrandLogo from './BrandLogo';
import ColorSchemeToggle from './ColorSchemeToggle';

function Header() {
  return (
    <header className={classes.header}>
      <Group justify="space-between" style={{ height: '100%' }}>
        <UnstyledButton component={Link} to="/">
          <BrandLogo />
        </UnstyledButton>
        <ColorSchemeToggle />
      </Group>
    </header>
  );
}

export default Header;
