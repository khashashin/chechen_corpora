import { ActionIcon, Box, Group } from '@mantine/core';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';
import ColorSchemeToggle from '../../../components/ColorSchemeToggle';
import HeaderBrand from '../../../components/HeaderBrand';

function SearchHeader() {
	const navigate = useNavigate();

	const handleSearchClose = () => {
		return navigate('/');
	};

	return (
		<Box style={{ height: '60px' }} px='md'>
			<Group justify='apart' style={{ height: '100%' }}>
				<HeaderBrand />

				<Group>
					<ColorSchemeToggle />
					<ActionIcon radius='xl' variant='outline' title='Закрыть' onClick={handleSearchClose}>
						<IconX />
					</ActionIcon>
				</Group>
			</Group>
		</Box>
	);
}

export default memo(SearchHeader);
