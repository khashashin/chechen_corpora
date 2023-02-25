import { Header, Group, Button, Box } from '@mantine/core';
import ColorSchemeToggle from '../ColorSchemeToggle';
import HeaderBrand from '../HeaderBrand';

function PublicHeader() {
	const isAuth = false;

	return (
		<Box>
			<Header height={60} px='md'>
				<Group position='apart' sx={{ height: '100%' }}>
					<HeaderBrand />

					<Group>
						<ColorSchemeToggle />
						{/* {isAuth ? <Button>Регистрация</Button> : <Button variant='default'>Вход</Button>} */}
					</Group>
				</Group>
			</Header>
		</Box>
	);
}

export default PublicHeader;
