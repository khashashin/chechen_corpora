import { ActionIcon, Box, Group, Paper, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo, useState } from 'react';
import { BsChevronBarContract, BsChevronBarExpand } from 'react-icons/all';
import { escapeRegExp } from 'lodash';
import SearchUniqueWords from './SearchUniqueWords';
import SharedUtils from '../../../shared/utils';
import SearchWordPopularityChart from './SearchWordPopularityChart';
import SearchInPairWith from './SearchInPairWith';
import SearchSimilarWords from './SearchSimilarWords';

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
			return sentence.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>');
		}
		return sentence.replace(new RegExp(`(${escapedQuery})`, 'gi'), `<mark>$1</mark>`);
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
			sx={{
				minHeight: 'calc(100vh - 280px)',
			}}>
			{isLoading && <p>Loading...</p>}
			{searchData?.results.length === 0 && <p>Ничего не найдено</p>}
			{searchData?.results.length > 0 && (
				<SearchWordPopularityChart chartData={SharedUtils.getChartData(searchData)} />
			)}
			<Group position='apart' spacing='md' align='start'>
				{searchData?.unique_words.length > 0 && (
					<SearchUniqueWords uniqueWords={searchData?.unique_words} />
				)}
				{(searchData?.in_pair_before?.length > 0 || searchData?.in_pair_after?.length > 0) && (
					<SearchInPairWith
						inPairBefore={searchData?.in_pair_before}
						inPairAfter={searchData?.in_pair_after}
					/>
				)}
				{searchData?.similar_words?.length > 0 && (
					<SearchSimilarWords similarWords={searchData?.similar_words} />
				)}
			</Group>
			{searchQuery && (
				<h1
					style={{
						fontSize: '1.5rem',
					}}>
					Результаты поиска по запросу: {searchQuery}
				</h1>
			)}
			{searchData && (
				<Stack spacing={isMobile ? 'md' : 'xl'}>
					{searchData?.results.map((item: any) => (
						<Paper
							key={item.uuid}
							shadow='sm'
							p={isMobile ? 'md' : 'xl'}
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => {
								if (opened.includes(item.uuid)) {
									setOpened((o) => o.filter((id) => id !== item.uuid));
								} else {
									setOpened((o) => [...o, item.uuid]);
								}
							}}>
							<Group position='apart' spacing='md' noWrap>
								{getSearchItemContent(item)}
								{opened.includes(item.uuid) ? (
									<ActionIcon
										title={isMobile ? 'Свернуть' : 'Свернуть предложение'}
										onClick={() => setOpened((o) => o.filter((id) => id !== item.uuid))}>
										<BsChevronBarContract />
									</ActionIcon>
								) : (
									<ActionIcon
										title={isMobile ? 'Развернуть' : 'Развернуть предложение'}
										onClick={() => setOpened((o) => [...o, item.uuid])}>
										<BsChevronBarExpand />
									</ActionIcon>
								)}
							</Group>
							{opened.includes(item.uuid) && item.origin.sources.length > 0 && (
								<>
									<h5>Ресурс{item.origin.sources.length > 1 ? 'ы' : ''}:</h5>
									<ul>
										{item.origin.sources.map((source: string) => (
											<li key={SharedUtils.uuidv4}>{source}</li>
										))}
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
