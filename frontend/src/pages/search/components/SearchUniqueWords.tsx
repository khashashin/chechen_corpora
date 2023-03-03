import { Badge, Box, Group } from '@mantine/core';
import { memo } from 'react';

type SearchUniqueWordsProps = {
	uniqueWords: string[];
};

function SearchUniqueWords(props: SearchUniqueWordsProps) {
	const { uniqueWords } = props;

	return (
		<Box mt='lg'>
			<h4>Список уникальных слов, содержащих искомое слово или фразу:</h4>
			<Group>
				{uniqueWords.map((item: any) => (
					<Badge key={item} variant='outline'>
						{item}
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default memo(SearchUniqueWords);
