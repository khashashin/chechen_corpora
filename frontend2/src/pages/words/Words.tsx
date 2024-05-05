import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Paper,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Fragment, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { useQuery } from '@tanstack/react-query';
import { IconFilter, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import WordsLoadingSkeleton from './components/WordsLoadingSkeleton';
import { getUniqueWords } from './API';

function WordsPage() {
  const { data: words, isLoading } = useQuery({
    queryKey: ['uniqueWords'],
    queryFn: getUniqueWords,
  });
  const [filterText, setFilterText] = useState('');
  const isMobile = useMediaQuery('(max-width: 920px)');
  const navigate = useNavigate();

  const listItems: string[] = useMemo(
    () =>
      Object.values(words?.data)
        .flat()
        .filter(
          (word: unknown) =>
            typeof word === 'string' && word.includes(filterText),
        ) as string[],
    [words, filterText],
  );

  const dynamicHeight = useMemo(() => {
    if (listItems.length === 0 || listItems.length > 20) {
      return 'calc(100vh - 200px)';
    }

    // TODO: Check this calculation, it grows somehow exponentially
    return `${82 * listItems.length}px`;
  }, [listItems.length]);

  return (
    <Container size="lg">
      <Header />
      <Box my="xl">
        <TextInput
          leftSection={<IconFilter />}
          label="Фильтр"
          rightSection={
            <ActionIcon variant="transparent" onClick={() => setFilterText('')}>
              <IconX />
            </ActionIcon>
          }
          value={filterText}
          onChange={(e) => setFilterText(e.currentTarget.value)}
        />
      </Box>
      {isLoading && <WordsLoadingSkeleton />}
      {words && (
        <Tabs
          defaultValue={Object.keys(words.data)[0]}
          keepMounted={false}
          color="green"
          styles={() => ({
            tab: {
              padding: '10px 0',
              minWidth: '30px',
              marginBottom: '0',
            },
          })}
        >
          <Tabs.List
            grow
            style={{
              overflowX: 'auto',
              flexWrap: 'nowrap',
              padding: '0 10px',
              ...(isMobile && {
                boxShadow:
                  'inset 7px 0 9px -7px rgb(0 0 0 / 40%), inset -7px 0 9px -7px rgb(0 0 0 / 40%);',
              }),
            }}
          >
            <Tabs.Tab key="all" value="all">
              Все
            </Tabs.Tab>
            {Object.keys(words.data).map((key: string) => (
              <Tabs.Tab key={key} value={key}>
                {key}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="all" h={dynamicHeight}>
            <Paper shadow="xs" p="md" h="100%">
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={listItems.length}
                    itemData={listItems}
                    itemSize={49.7}
                  >
                    {({ index, style }) => {
                      const word = listItems[index];

                      return (
                        <div style={style}>
                          <Anchor
                            onClick={(event) => {
                              event.preventDefault();
                              navigate(`/search?q=${word}`);
                            }}
                          >
                            {word as string}
                          </Anchor>
                          <Divider my="sm" variant="dashed" />
                        </div>
                      );
                    }}
                  </List>
                )}
              </AutoSizer>
            </Paper>
          </Tabs.Panel>
          {Object.keys(words.data).map((key: string) => (
            <Tabs.Panel key={key} value={key}>
              <Paper shadow="xs" p="md">
                {words.data[key]
                  .filter((word: string) => word.includes(filterText))
                  .map((word: string) => (
                    <Fragment key={word}>
                      <Anchor
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(`/search?q=${word}`);
                        }}
                      >
                        {word}
                      </Anchor>
                      <Divider my="sm" variant="dashed" />
                    </Fragment>
                  ))}
              </Paper>
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
      <Footer />
    </Container>
  );
}

export default WordsPage;
