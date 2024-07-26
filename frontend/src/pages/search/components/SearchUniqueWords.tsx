import { Anchor, Badge, Box, Group } from '@mantine/core';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchUniqueWordsProps = {
	uniqueWords: string[];
};

function SearchUniqueWords(props: SearchUniqueWordsProps) {
	const { uniqueWords } = props;
	const navigate = useNavigate();

	return (
		<Box mt='lg'>
			<h4>Список уникальных слов, содержащих в себе искомое слово или фразу:</h4>
			<Group>
				{uniqueWords.map((item: any) => (
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

export default memo(SearchUniqueWords);
