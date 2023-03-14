import { Badge, Box, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getRandomWords } from '../services/api';

function SearchHintWords() {
	const { data: hintWords, isInitialLoading } = useQuery(['hintWords'], () => getRandomWords());

	return (
		<Box mt='lg'>
			<h4>Список случайных слов, по которым вы можете осуществить поиск:</h4>
			<Group>
				{hintWords?.data.map((word: string) => (
					<Badge key={word} variant='outline'>
						{word}
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default SearchHintWords;
