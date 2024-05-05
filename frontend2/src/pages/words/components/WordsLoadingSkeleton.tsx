import { Box, Divider, Paper, Skeleton, Stack } from '@mantine/core';

function WordsLoadingSkeleton() {
  return (
    <Box my="xl">
      <Paper shadow="xs" p="sm">
        <Stack gap="sm">
          <p>Загрузка...</p>
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
          <Skeleton height={20} />
          <Divider my="sm" variant="dashed" />
        </Stack>
      </Paper>
    </Box>
  );
}

export default WordsLoadingSkeleton;
