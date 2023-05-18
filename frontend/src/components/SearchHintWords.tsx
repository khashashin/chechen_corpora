import { Anchor, Badge, Box, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';
import { getRandomWords } from '../pages/search/services/api';

function SearchHintWords() {
	const { data: hintWords } = useQuery(['hintWords'], () => getRandomWords());
	const navigate = useNavigate();

	return (
		<Box mt='lg'>
			<h4>Список случайных слов, по которым вы можете осуществить поиск:</h4>
			<Group>
				{hintWords?.data.map((word: string) => (
					<Badge key={word} variant='outline'>
						<Anchor
							onClick={(event) => {
								event.preventDefault();
								navigate({ to: `/search?q=${word}` });
							}}>
							{word}
						</Anchor>
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default SearchHintWords;
