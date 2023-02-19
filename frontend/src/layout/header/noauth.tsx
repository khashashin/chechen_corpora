import { createStyles, Header } from '@mantine/core';
import HeaderBrand from './brand';

const useStyles = createStyles(() => ({
	header: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
}));

function NoAuthAppHeader() {
	const { classes } = useStyles();

	return (
		<Header height={60} p='md' className={classes.header}>
			<HeaderBrand />
		</Header>
	);
}

export default NoAuthAppHeader;
