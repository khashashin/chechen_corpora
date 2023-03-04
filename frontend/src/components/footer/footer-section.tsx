import { createStyles, Container, Group, Anchor } from '@mantine/core';
import { memo } from 'react';
import BrandLogo from '../BrandLogo';

const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: 120,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,

		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('xs')]: {
			marginTop: theme.spacing.md,
		},
	},
}));

const links = [
	{
		link: 'mailto:info@dosham.info',
		label: 'Написать нам',
	},
];

function FooterSection() {
	const { classes } = useStyles();
	const items = links.map((link) => (
		<Anchor<'a'>
			color='dimmed'
			key={link.label}
			href={link.link}
			onClick={(event) => event.preventDefault()}
			size='sm'>
			{link.label}
		</Anchor>
	));

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<BrandLogo />
				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
}

export default memo(FooterSection);
