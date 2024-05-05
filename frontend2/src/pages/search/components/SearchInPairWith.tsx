import { Text, Box, Group, Divider } from '@mantine/core';
import { Fragment, memo } from 'react';

type SearchInPairWithProps = {
  inPairBefore: string[];
  inPairAfter: string[];
};

function SearchInPairWith(props: SearchInPairWithProps) {
  const { inPairBefore, inPairAfter } = props;

  const counterBefore = inPairBefore.reduce(
    (acc: any, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {},
  );

  const counterAfter = inPairAfter.reduce(
    (acc: any, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {},
  );

  return (
    <Box mt="lg">
      <h4>Список слов, встречающихся в паре с искомым словом или фразой:</h4>
      <Group>
        {Object.keys(counterBefore).map((item: any) => (
          <Fragment key={item}>
            <Text>
              {item} ({counterBefore[item]})
            </Text>
            <Divider orientation="vertical" />
          </Fragment>
        ))}
        {Object.keys(counterAfter).map((item: any) => (
          <Fragment key={item}>
            <Text>
              {item} ({counterAfter[item]})
            </Text>
            <Divider orientation="vertical" />
          </Fragment>
        ))}
      </Group>
    </Box>
  );
}

export default memo(SearchInPairWith);
