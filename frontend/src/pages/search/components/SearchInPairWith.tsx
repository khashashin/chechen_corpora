import { Badge, Box, Group } from '@mantine/core';
import { memo, useEffect, useState } from 'react';

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
		{}
	);

	const counterAfter = inPairAfter.reduce(
		(acc: any, value) => ({
			...acc,
			[value]: (acc[value] || 0) + 1,
		}),
		{}
	);

	return (
		<Box mt='lg'>
			<h4>Список слов, встречающихся в паре с искомым словом или фразой:</h4>
			<Group>
				{Object.keys(counterBefore).map((item: any) => (
					<Badge key={item} variant='outline'>
						{item} ({counterBefore[item]})
					</Badge>
				))}
				{Object.keys(counterAfter).map((item: any) => (
					<Badge key={item} variant='outline'>
						{item} ({counterAfter[item]})
					</Badge>
				))}
			</Group>
		</Box>
	);
}

export default memo(SearchInPairWith);
