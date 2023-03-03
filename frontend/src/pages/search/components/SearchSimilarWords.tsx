import { Badge, Box, Group } from '@mantine/core';
import { memo } from 'react';

type SearchSimilarWordsProps = {
	similarWords: string[];
};

function SearchSimilarWords(props: SearchSimilarWordsProps) {
	const { similarWords } = props;

	return (
		<Box mt='lg'>
			<h4>Список слов, похожих на искомое слово или фразу:</h4>
			<Group>
				{similarWords.map((item: any) => (
					<Badge key={item} variant='outline'>
						{item}
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default memo(SearchSimilarWords);
