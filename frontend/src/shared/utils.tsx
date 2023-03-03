const SharedUtils = {
	uuidv4: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0; // eslint-disable-line no-bitwise
		const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
		return v.toString(16);
	}),
	getChartData: (data: any) => {
		return data.results.reduce((acc: any, item: any) => {
			const year = SharedUtils.getWordUsageYear(item);
			const words = item.matching_words;
			if (year) {
				if (acc[year]) {
					acc[year] = [...acc[year], ...words];
				} else {
					acc[year] = words;
				}
			}
			return acc;
		}, {});
	},
	getWordUsageYear: (data: any) => {
		const sources = ['book', 'article', 'newspaper', 'other'];
		return sources.reduce((acc: any, source: string) => {
			if (data[source] && data[source].year) {
				return data[source].year;
			}
			return acc;
		}, null);
	},
};

export default SharedUtils;
