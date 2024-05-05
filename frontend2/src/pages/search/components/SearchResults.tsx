import { ActionIcon, Box, Paper, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo, useState } from 'react';
import { escapeRegExp } from 'lodash-es';
import { BsChevronBarContract, BsChevronBarExpand } from 'react-icons/bs';
import uuidv4 from 'src/utils/uuidv4';
import SearchUniqueWords from './SearchUniqueWords';
import SearchWordPopularityChart from './SearchWordPopularityChart';
import SearchInPairWith from './SearchInPairWith';
import SearchSimilarWords from './SearchSimilarWords';
import { getChartData } from '../API';

type SearchResultsProps = {
  searchData: any;
  isLoading: boolean;
  searchQuery: string;
};

function SearchResults(props: SearchResultsProps) {
  const { searchData, isLoading, searchQuery } = props;

  const [opened, setOpened] = useState<string[]>([]);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleQueryHighlight = (sentence: string) => {
    const escapedQuery = escapeRegExp(searchQuery);

    if (escapedQuery.includes('1')) {
      const query = escapedQuery.replaceAll('1', 'ӏ');
      // mark all occurrences of the query
      return sentence.replace(
        new RegExp(`(${query})`, 'gi'),
        '<mark>$1</mark>',
      );
    }
    return sentence.replace(
      new RegExp(`(${escapedQuery})`, 'gi'),
      `<mark>$1</mark>`,
    );
  };

  const getSearchItemContent = (item: any) => {
    const highlightedSentence = handleQueryHighlight(item.sentence);

    if (!opened.includes(item.uuid))
      return <span dangerouslySetInnerHTML={{ __html: highlightedSentence }} />;

    const content = `${
      item.previous_sentence ? `${item.previous_sentence} ` : ''
    }${highlightedSentence} ${item.next_sentence ? item.next_sentence : ''}`;

    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 280px)',
      }}
    >
      {isLoading && <p>Loading...</p>}
      {searchData?.results.length === 0 && <p>Ничего не найдено</p>}
      {searchData?.results.length > 0 && (
        <SearchWordPopularityChart chartData={getChartData(searchData)} />
      )}
      <Stack justify="apart" gap="md" align="start">
        {searchData?.unique_words.length > 0 && (
          <SearchUniqueWords uniqueWords={searchData?.unique_words} />
        )}
        {(searchData?.in_pair_before?.length > 0 ||
          searchData?.in_pair_after?.length > 0) && (
          <SearchInPairWith
            inPairBefore={searchData?.in_pair_before}
            inPairAfter={searchData?.in_pair_after}
          />
        )}
        {searchData?.similar_words?.length > 0 && (
          <SearchSimilarWords similarWords={searchData?.similar_words} />
        )}
      </Stack>
      {searchQuery && (
        <h1
          style={{
            fontSize: '1.5rem',
          }}
        >
          Результаты поиска по запросу: {searchQuery}
        </h1>
      )}
      {searchData && (
        <Stack gap={isMobile ? 'md' : 'xl'}>
          {searchData?.results.map((item: any) => (
            <Paper
              key={item.uuid}
              shadow="sm"
              p={isMobile ? 'md' : 'xl'}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                if (opened.includes(item.uuid)) {
                  setOpened((o) => o.filter((id) => id !== item.uuid));
                } else {
                  setOpened((o) => [...o, item.uuid]);
                }
              }}
            >
              <Box
                flex="noWrap"
                display="flex"
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {getSearchItemContent(item)}
                {opened.includes(item.uuid) ? (
                  <ActionIcon
                    component="span"
                    mb="auto"
                    variant="transparent"
                    title={isMobile ? 'Свернуть' : 'Свернуть предложение'}
                    onClick={() =>
                      setOpened((o) => o.filter((id) => id !== item.uuid))
                    }
                  >
                    <BsChevronBarContract />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    component="span"
                    mb="auto"
                    variant="transparent"
                    title={isMobile ? 'Развернуть' : 'Развернуть предложение'}
                    onClick={() => setOpened((o) => [...o, item.uuid])}
                  >
                    <BsChevronBarExpand />
                  </ActionIcon>
                )}
              </Box>
              {opened.includes(item.uuid) && item.origin.sources.length > 0 && (
                <>
                  <h5>Ресурс{item.origin.sources.length > 1 ? 'ы' : ''}:</h5>
                  <ul>
                    {item.origin.sources.map(
                      (source: string, index: number) => (
                        <li key={JSON.stringify([uuidv4, index])}>{source}</li>
                      ),
                    )}
                  </ul>
                </>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default memo(SearchResults);
