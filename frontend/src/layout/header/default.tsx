import { Burger, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import HeaderBrand from '../../components/HeaderBrand';
import ColorSchemeToggle from '../../components/ColorSchemeToggle';

type Props = {
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
};

function DefaultAppHeader({ opened, setOpened }: Props) {
	const { colors } = useMantineTheme();
	const isDesktop = useMediaQuery('(min-width: 768px)');

	return (
		<>
			<Group style={{ height: '100%' }} px={20} justify='apart'>
				<Burger
					opened={opened}
					onClick={() => setOpened((o) => !o)}
					size='sm'
					color={colors.gray[6]}
					mr='xl'
					style={{
						display: isDesktop ? 'none' : 'block',
					}}
				/>
				<HeaderBrand />
			</Group>
			<ColorSchemeToggle />
		</>
	);
}

export default DefaultAppHeader;
