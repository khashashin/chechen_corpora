import { Group, Navbar, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { RiCharacterRecognitionLine, RiArticleFill } from 'react-icons/ri';
import { SiBookstack } from 'react-icons/si';
import { IoNewspaperSharp } from 'react-icons/io5';
import { GiMaterialsScience } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from '@tanstack/react-location';

type MainLinkProps = {
	icon: ReactNode;
	color: string;
	label: string;
	to: string;
	id: string;
};

function MainLink({ icon, color, label, to, id }: MainLinkProps) {
	return (
		<UnstyledButton
			sx={(theme) => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				},
			})}
			component={Link}
			to={to}
			id={id}>
			<Group>
				<ThemeIcon color={color} variant='light'>
					{icon}
				</ThemeIcon>

				<Text size='sm'>{label}</Text>
			</Group>
		</UnstyledButton>
	);
}

const data = [
	{
		icon: <RiCharacterRecognitionLine size={16} />,
		color: 'blue',
		label: 'Создать',
		to: '/admin/upload',
		id: 'upload',
	},
	{
		icon: <SiBookstack size={16} />,
		color: 'teal',
		label: 'Книги',
		to: '/admin/books',
		id: 'books',
	},
	{
		icon: <IoNewspaperSharp size={16} />,
		color: 'violet',
		label: 'Газеты и журналы',
		to: '/admin/newspapers',
		id: 'newspapers',
	},
	{
		icon: <RiArticleFill size={16} />,
		color: 'grape',
		label: 'Статьи и доклады',
		to: '/admin/articles',
		id: 'articles',
	},
	{
		icon: <GiMaterialsScience size={16} />,
		color: 'sky',
		label: 'Научные статьи',
		to: '/admin/scientific-articles',
		id: 'scientific-articles',
	},
	{
		icon: <BiCategoryAlt size={16} />,
		color: 'warning',
		label: 'Другое',
		to: '/admin/diverse-materials',
		id: 'diverseMaterials',
	},
];

function MainLinks() {
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}

type AppNavigationProps = {
	opened: boolean;
};

function AppNavigation({ opened }: AppNavigationProps) {
	return (
		<Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200, lg: 300 }}>
			<Navbar.Section grow mt='md'>
				<MainLinks />
			</Navbar.Section>
			<Navbar.Section>
				<div>User</div>
			</Navbar.Section>
		</Navbar>
	);
}

export default AppNavigation;
