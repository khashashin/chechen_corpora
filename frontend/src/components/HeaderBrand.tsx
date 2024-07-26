import { UnstyledButton } from '@mantine/core';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

function HeaderBrand() {
	return (
		<UnstyledButton component={Link} to='/'>
			<BrandLogo />
		</UnstyledButton>
	);
}

export default memo(HeaderBrand);
