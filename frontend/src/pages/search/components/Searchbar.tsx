import {
	ActionIcon,
	Box,
	createStyles,
	Group,
	Loader,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { memo, useEffect, useState } from 'react';
import { useDebouncedValue, useFocusTrap } from '@mantine/hooks';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
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

type SearchbarProps = {
	onSearchResult: (result: any) => void;
	isLoading: boolean;
};

function Searchbar(props: SearchbarProps) {
	const { onSearchResult, isLoading } = props;

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedResult] = useDebouncedValue(searchQuery, 500);
	const focusTrapRef = useFocusTrap();

	const theme = useMantineTheme();
	const { classes } = useStyles();

	useEffect(() => {
		if (debouncedResult.length > 0) {
			onSearchResult(debouncedResult);
		}
	}, [debouncedResult, onSearchResult]);

	return (
		<Group className={classes.controls} spacing={3}>
			<Text fz='sm'>Введите слово или словосочетание для поиска</Text>
			<TextInput
				ref={focusTrapRef}
				value={searchQuery}
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
				onChange={(event) => {
					setSearchQuery(event.currentTarget.value);
				}}
			/>
			{isLoading && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '50px',
						backgroundColor: theme.colors.gray[2],
						borderRadius: '3px',
					}}>
					<Loader size='sm' variant='bars' />
				</Box>
			)}
		</Group>
	);
}

export default memo(Searchbar);
