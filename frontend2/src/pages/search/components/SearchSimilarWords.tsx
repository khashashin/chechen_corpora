import { Box, Group } from '@mantine/core';
import { memo } from 'react';
import AnchorBadge from 'src/components/AnchorBadge/AnchorBadge';

type SearchSimilarWordsProps = {
  similarWords: string[];
};

function SearchSimilarWords(props: SearchSimilarWordsProps) {
  const { similarWords } = props;

  return (
    <Box mt="lg">
      <h4>Список слов, похожих на искомое слово или фразу:</h4>
      <Group>
        {similarWords.map((item: any) => (
          <AnchorBadge key={item} word={item} />
        ))}
      </Group>
    </Box>
  );
}

export default memo(SearchSimilarWords);
