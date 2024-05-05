import { Container } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import SearchHintWords from 'src/components/SearchHintWords/SearchHintWords';
import SearchResults from './components/SearchResults';
import { getSearchResult } from './API';
import Searchbar from './components/Searchbar';

function SearchPage() {
  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getSearchResult(query),
    enabled: query.length > 0,
  });

  useEffect(() => {
    console.log('searchResults', searchResults);
  }, [searchResults]);

  const onSearchResult = useCallback(
    (result: string) => {
      setQuery(result);
    },
    [setQuery],
  );

  return (
    <Container size="lg">
      <Header />
      <Searchbar onSearchResult={onSearchResult} isLoading={isLoading} />
      {query.length <= 0 && <SearchHintWords />}
      <SearchResults
        searchData={searchResults?.data}
        isLoading={isLoading}
        searchQuery={query}
      />
      <Footer />
    </Container>
  );
}

export default SearchPage;
