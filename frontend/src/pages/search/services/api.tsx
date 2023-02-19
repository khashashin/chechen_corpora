// eslint-disable-next-line import/prefer-default-export
export const getSearchResult = async (query: string) => {
	console.log(query);

	return [
		{
			id: 1,
			title: 'Test',
			author: 'Test',
			year: 2021,
			text: 'Test',
		},
	];
};
