import { useNavigate } from '@tanstack/react-location';
import { ActionIcon, Group, Header } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { memo } from 'react';
import BrandLogo from '../../../components/BrandLogo';
import ColorSchemeToggle from '../../../components/ColorSchemeToggle';

function SearchHeader() {
	const navigate = useNavigate();

	const handleSearchClose = () => {
		return navigate({ to: '/' });
	};

	return (
		<Header height={60} px='md'>
			<Group position='apart' sx={{ height: '100%' }}>
				<BrandLogo />

				<Group>
					<ColorSchemeToggle />
					<ActionIcon radius='xl' variant='outline' title='Закрыть' onClick={handleSearchClose}>
						<IconX />
					</ActionIcon>
				</Group>
			</Group>
		</Header>
	);
}

export default memo(SearchHeader);
