import { Paper } from '@mantine/core';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

function PopularityChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length && payload[0].value) {
		const { value } = payload[0];
		return (
			<Paper shadow='sm' p='xs' withBorder>
				<small>
					<em>
						Данное слово встречается в<br />
						имеющихся текстах в {value} случаях за {label} год.
					</em>
				</small>
			</Paper>
		);
	}
	return null;
}

export default PopularityChartTooltip;
