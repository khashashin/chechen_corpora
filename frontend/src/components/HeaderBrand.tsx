import { UnstyledButton } from '@mantine/core';
import { Link } from '@tanstack/react-location';
import { memo } from 'react';
import BrandLogo from './BrandLogo';

function HeaderBrand() {
	return (
		<UnstyledButton component={Link} to='/'>
			<BrandLogo />
		</UnstyledButton>
	);
}

export default memo(HeaderBrand);
