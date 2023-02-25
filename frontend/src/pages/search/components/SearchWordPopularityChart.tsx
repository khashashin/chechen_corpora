import { memo, useEffect, useState } from 'react';

type SearchWordPopularityChartProps = {
	searchData: any;
};

function SearchWordPopularityChart(props: SearchWordPopularityChartProps) {
	// TODO: Implement word popularity chart
	const { searchData } = props;

	const [chartData, setChartData] = useState<any>([]);

	useEffect(() => {}, [searchData]);

	return (
		<div>
			<h1>SearchWordPopularityChart</h1>
		</div>
	);
}

export default memo(SearchWordPopularityChart);
