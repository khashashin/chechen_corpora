import { ActionIcon, Box, Group, Loader, Text, TextInput, useMantineTheme } from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { memo, useEffect, useState } from 'react';
import { useDebouncedValue, useFocusTrap } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

type SearchbarProps = {
	onSearchResult: (result: any) => void;
	isLoading: boolean;
};

function Searchbar(props: SearchbarProps) {
	const { onSearchResult, isLoading } = props;

	const [searchQuery, setSearchQuery] = useState<string>('');

	const params = useParams();
	const [debouncedResult] = useDebouncedValue(searchQuery, 500);
	const focusTrapRef = useFocusTrap();

	const theme = useMantineTheme();

	useEffect(() => {
		onSearchResult(debouncedResult);
	}, [debouncedResult, onSearchResult]);

	useEffect(() => {
		const { q } = params as any;

		if (q) {
			setSearchQuery(q);
		}
	}, [params]);

	return (
		<Group gap={3}>
			<Text fz='sm'>
				Введите слово или словосочетание для поиска (вместо буквы Ӏ вы можете использовать цифру 1)
			</Text>
			<TextInput
				ref={focusTrapRef}
				value={searchQuery}
				leftSection={<AiOutlineSearch size={24} />}
				size='lg'
				rightSection={
					<ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled'>
						<BsArrowRightShort size={24} />
					</ActionIcon>
				}
				placeholder='Поиск по корпусу'
				rightSectionWidth={42}
				onChange={(event) => {
					setSearchQuery(event.currentTarget.value);
				}}
			/>
			{isLoading && (
				<Box
					style={{
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
