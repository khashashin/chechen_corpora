import { UnstyledButton } from '@mantine/core';
import { Link } from '@tanstack/react-location';
import BrandLogo from '../../components/BrandLogo';

function HeaderBrand() {
	return (
		<UnstyledButton component={Link} to='/'>
			<BrandLogo />
		</UnstyledButton>
	);
}

export default HeaderBrand;
