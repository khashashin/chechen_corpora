import { ActionIcon, Box, Container, Divider, Paper, Tabs, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconFilter, IconX } from '@tabler/icons';
import { getUniqueWords } from './services/api';
import PublicHeader from '../../components/header/public-header';
import FooterSection from '../../components/footer/footer-section';

function WordsPage() {
	const { data: words } = useQuery(['uniqueWords'], () => getUniqueWords());
	const [filterText, setFilterText] = useState('');

	return (
		<Container size='lg'>
			<PublicHeader />
			<Box my='xl'>
				<TextInput
					icon={<IconFilter />}
					label='Фильтр'
					rightSection={
						<ActionIcon onClick={() => setFilterText('')}>
							<IconX />
						</ActionIcon>
					}
					value={filterText}
					onChange={(e) => setFilterText(e.currentTarget.value)}
				/>
			</Box>
			{!words && <p>Загрузка...</p>}
			{words && (
				<Tabs
					defaultValue={Object.keys(words.data)[0]}
					styles={(theme) => ({
						tab: {
							padding: '10px 0',
						},
					})}>
					<Tabs.List grow>
						<Tabs.Tab value='all'>Все</Tabs.Tab>
						{Object.keys(words.data).map((key: string) => (
							<Tabs.Tab key={key} value={key}>
								{key}
							</Tabs.Tab>
						))}
					</Tabs.List>

					<Tabs.Panel value='all'>
						<Paper shadow='xs' p='md'>
							{Object.keys(words.data).map((key: string) => (
								<>
									{words.data[key]
										.filter((word: string) => word.includes(filterText))
										.map((word: string) => (
											<>
												<p key={word}>{word}</p>
												<Divider my='sm' variant='dashed' />
											</>
										))}
								</>
							))}
						</Paper>
					</Tabs.Panel>
					{Object.keys(words.data).map((key: string) => (
						<Tabs.Panel key={key} value={key}>
							<Paper shadow='xs' p='md'>
								{words.data[key]
									.filter((word: string) => word.includes(filterText))
									.map((word: string) => (
										<>
											<p key={word}>{word}</p>
											<Divider my='sm' variant='dashed' />
										</>
									))}
							</Paper>
						</Tabs.Panel>
					))}
				</Tabs>
			)}
			<FooterSection />
		</Container>
	);
}

export default WordsPage;