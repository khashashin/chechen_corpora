import { ActionIcon, Box, Group, Paper, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo, useState } from 'react';
import { BsChevronBarContract, BsChevronBarExpand } from 'react-icons/all';
import SearchUniqueWords from './SearchUniqueWords';
import SharedUtils from '../../../shared/utils';
import SearchWordPopularityChart from './SearchWordPopularityChart';
import SearchInPairWith from './SearchInPairWith';

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
		if (searchQuery.includes('1')) {
			const query = searchQuery.replaceAll('1', 'ӏ');
			return sentence.replace(query, `<mark>${query}</mark>`);
		}
		return sentence.replace(searchQuery, `<mark>${searchQuery}</mark>`);
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
		<Box>
			{isLoading && <p>Loading...</p>}
			{searchData?.results.length === 0 && <p>Ничего не найдено</p>}
			{searchData?.results.length > 0 && (
				<SearchWordPopularityChart chartData={SharedUtils.getChartData(searchData)} />
			)}
			<Group position='apart' spacing='md' noWrap={!isMobile} align='start'>
				{searchData?.unique_words.length > 0 && (
					<SearchUniqueWords uniqueWords={searchData?.unique_words} />
				)}
				{(searchData?.in_pair_before?.length > 0 || searchData?.in_pair_after?.length > 0) && (
					<SearchInPairWith
						inPairBefore={searchData?.in_pair_before}
						inPairAfter={searchData?.in_pair_after}
					/>
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
						<Paper key={item.uuid} shadow='sm' p={isMobile ? 'md' : 'xl'}>
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
							{opened.includes(item.uuid) && item.book.sources.length > 0 && (
								<>
									<h5>Ресурс{item.book.sources.length > 1 ? 'ы' : ''}:</h5>
									<ul>
										{item.book.sources.map((source: string) => (
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
