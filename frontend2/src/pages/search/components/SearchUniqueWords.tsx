import { Box, Group } from '@mantine/core';
import { memo } from 'react';
import AnchorBadge from 'src/components/AnchorBadge/AnchorBadge';

type SearchUniqueWordsProps = {
  uniqueWords: string[];
};

function SearchUniqueWords(props: SearchUniqueWordsProps) {
  const { uniqueWords } = props;

  return (
    <Box mt="lg">
      <h4>
        Список уникальных слов, содержащих в себе искомое слово или фразу:
      </h4>
      <Group>
        {uniqueWords.map((item: any) => (
          <AnchorBadge key={item} word={item} />
        ))}
      </Group>
    </Box>
  );
}

export default memo(SearchUniqueWords);
