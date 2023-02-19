import { createStyles, Group, Image, useMantineTheme } from '@mantine/core';
import image from '../assets/corpora_logo.png';

const useStyles = createStyles((theme) => ({
	brand: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',

		'& > *:first-of-type': {
			marginRight: theme.spacing.xs,
			width: '40px !important',
		},
	},
}));

function BrandLogo() {
	const { classes } = useStyles();
	const theme = useMantineTheme();
	return (
		<Group className={classes.brand}>
			<Image src={image} />
			<h1
				style={{
					fontSize: '1.5rem',
					fontWeight: 500,
					margin: 0,
					color: theme.fn.primaryColor(),
				}}>
				Бухӏа
			</h1>
		</Group>
	);
}

export default BrandLogo;
