import { Container } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Searchbar from './components/Searchbar';
import { getSearchResult } from './services/api';
import SearchResults from './components/SearchResults';
import SearchHeader from './components/SearchHeader';
import FooterSection from '../../components/footer/footer-section';

function SearchPage() {
	const [query, setQuery] = useState('');
	const { data: searchResults, isInitialLoading } = useQuery(
		['search', query],
		() => getSearchResult(query),
		{
			enabled: query.length > 0,
		}
	);

	const onSearchResult = (result: string) => {
		setQuery(result);
	};

	return (
		<Container size='lg'>
			<SearchHeader />
			<Searchbar onSearchResult={onSearchResult} isLoading={isInitialLoading} />
			<SearchResults searchData={searchResults} isLoading={isInitialLoading} />
			<FooterSection />
		</Container>
	);
}

export default SearchPage;
