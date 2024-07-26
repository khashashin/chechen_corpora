import { Anchor, Badge, Box, Group } from '@mantine/core';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

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
								navigate(`/search?q=${item}`);
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
