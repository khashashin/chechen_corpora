import { Burger, createStyles, Group, Header, MediaQuery, useMantineTheme } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import HeaderBrand from './brand';
import ColorSchemeToggle from '../../components/ColorSchemeToggle';

const useStyles = createStyles(({ colorScheme }) => ({
	header: {
		backgroundColor: colorScheme === 'light' ? '#fff' : '#111',
		paddingRight: 'calc(var(--removed-scroll-width) + 16px) !important',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
}));

type Props = {
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
};

function DefaultAppHeader({ opened, setOpened }: Props) {
	const { colors } = useMantineTheme();
	const { classes } = useStyles();

	return (
		<Header height={60} className={classes.header}>
			<Group sx={{ height: '100%' }} px={20} position='apart'>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={opened}
						onClick={() => setOpened((o) => !o)}
						size='sm'
						color={colors.gray[6]}
						mr='xl'
					/>
				</MediaQuery>
				<HeaderBrand />
			</Group>
			<ColorSchemeToggle />
		</Header>
	);
}

export default DefaultAppHeader;
