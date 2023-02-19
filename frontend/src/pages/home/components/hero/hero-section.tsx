import {
	createStyles,
	Container,
	Text,
	ActionIcon,
	Group,
	Title,
	TextInput,
	useMantineTheme,
	Stack,
	Image,
} from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from '@tanstack/react-location';
import image from '../../../../assets/language-corpora_hero2.png';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
	hero: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',

		'& > *:first-of-type': {
			marginRight: theme.spacing.md,
			width: '130px',

			[BREAKPOINT]: {
				width: '100%',
			},
		},

		[BREAKPOINT]: {
			flexDirection: 'column',
		},
	},

	inner: {
		position: 'relative',
		paddingTop: 200,
		paddingBottom: 120,

		[BREAKPOINT]: {
			paddingBottom: 80,
			paddingTop: 0,
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 2,

		[BREAKPOINT]: {
			marginTop: theme.spacing.xl,
		},
	},

	control: {
		width: '100%',
	},
}));

function HeroSection() {
	const { classes } = useStyles();
	const theme = useMantineTheme();
	const navigate = useNavigate();

	const handleSearchActive = () => {
		return navigate({ to: '/search' });
	};

	return (
		<Container size={700} className={classes.inner}>
			<Group className={classes.hero}>
				<Image src={image} />
				<Stack>
					<Title order={1}>
						<Text
							component='span'
							variant='gradient'
							gradient={{ from: 'green', to: 'cyan' }}
							inherit>
							Корпус чеченского языка
						</Text>{' '}
						собранный на открытых источниках
					</Title>

					<Text fz='lg' color='dimmed'>
						представительная коллекция текстов на чеченском языке
					</Text>
				</Stack>
			</Group>

			<Group className={classes.controls} spacing={3}>
				<TextInput
					icon={<AiOutlineSearch size={24} />}
					size='lg'
					rightSection={
						<ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled'>
							<BsArrowRightShort size={24} />
						</ActionIcon>
					}
					placeholder='Поиск по корпусу'
					rightSectionWidth={42}
					className={classes.control}
					onFocus={handleSearchActive}
					onClick={handleSearchActive}
				/>
				<Text fz='xs'>Введите слово или словосочетание для поиска</Text>
			</Group>
		</Container>
	);
}

export default HeroSection;
