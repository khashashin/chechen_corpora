import { Anchor, Badge, Box, Group } from '@mantine/core';
import { useNavigate } from '@tanstack/react-location';
import { memo } from 'react';

type SearchSimilarWordsProps = {
	similarWords: string[];
};

function SearchSimilarWords(props: SearchSimilarWordsProps) {
	const { similarWords } = props;
	const navigate = useNavigate();

	return (
		<Box mt='lg'>
			<h4>Список слов, похожих на искомое слово или фразу:</h4>
			<Group>
				{similarWords.map((item: any) => (
					<Badge key={item} variant='outline'>
						<Anchor
							onClick={(event) => {
								event.preventDefault();
								navigate({ to: `/search?q=${item}` });
							}}>
							{item}
						</Anchor>
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default memo(SearchSimilarWords);
