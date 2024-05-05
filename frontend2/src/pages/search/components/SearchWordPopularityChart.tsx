import { memo, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import PopularityChartTooltip from './SearchWordPopularityChartTooltip';

type ChartDataTypes = {
  chartData: {
    [year: string]: string[];
  } | null;
};

function SearchWordPopularityChart(props: ChartDataTypes) {
  const { chartData } = props;

  const [chartDataArray, setChartDataArray] = useState<any>([]);

  useEffect(() => {
    if (chartData) {
      const newChartDataArray = Object.keys(chartData).map((year) => {
        return {
          year,
          words: chartData[year].length,
        };
      });
      setChartDataArray([
        {
          year: '1900',
          words: 0,
        },
        ...newChartDataArray,
      ]);
    }
  }, [chartData]);

  return (
    <>
      <h4>
        График популярности найденных уникальных слов в текстах по годам (всего
        найдено{' '}
        {chartDataArray.reduce((acc: number, item: any) => acc + item.words, 0)}{' '}
        результатов по вашему запросу):
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={chartDataArray}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<PopularityChartTooltip />} />
          <Line
            type="monotone"
            dataKey="words"
            stroke="#2f9e44"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default memo(SearchWordPopularityChart);
