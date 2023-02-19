import { Header, Group, Button, Box } from '@mantine/core';
import BrandLogo from '../BrandLogo';
import ColorSchemeToggle from '../ColorSchemeToggle';

function PublicHeader() {
	const isAuth = false;

	return (
		<Box>
			<Header height={60} px='md'>
				<Group position='apart' sx={{ height: '100%' }}>
					<BrandLogo />

					<Group>
						<ColorSchemeToggle />
						{isAuth ? <Button>Регистрация</Button> : <Button variant='default'>Вход</Button>}
					</Group>
				</Group>
			</Header>
		</Box>
	);
}

export default PublicHeader;
