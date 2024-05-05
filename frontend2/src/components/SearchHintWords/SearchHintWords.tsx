import { Box, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getRandomWords } from './API';
import AnchorBadge from '../AnchorBadge/AnchorBadge';

function SearchHintWords() {
  const { data: hintWords } = useQuery({
    queryKey: ['hintWords'],
    queryFn: getRandomWords,
  });

  return (
    <Box mt="lg">
      <h4>Список случайных слов, по которым вы можете осуществить поиск:</h4>
      <Group>
        {hintWords?.data.map((word: string) => (
          <AnchorBadge key={word} word={word} />
        ))}
      </Group>
    </Box>
  );
}

export default SearchHintWords;
