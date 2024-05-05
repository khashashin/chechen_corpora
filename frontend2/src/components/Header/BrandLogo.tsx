import { Group, Image } from '@mantine/core';
import image from 'assets/corpora_logo.png';
import classes from './BrandLogo.module.css';

function BrandLogo() {
  return (
    <Group className={classes.logo}>
      <Image src={image} />
      <h1 className={classes.brand}>Бухӏа</h1>
    </Group>
  );
}

export default BrandLogo;
