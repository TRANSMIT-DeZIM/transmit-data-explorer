export type BarChartDataset = {
	xAxis: { type: string; data: string[] };
	series: {
		type: string;
		name: string;
		data: { value: number; itemStyle?: { color: string } }[];
	}[];
	seriesPct: BarChartDataset["series"];
	legend: {
		name: string;
		itemStyle?: { color: string };
	}[];
};

export function seriesValues(series: BarChartDataset["series"]): number[] {
	return series.flatMap((series) => series.data.map((item) => item.value));
}

export function seriesToPercentages(series: BarChartDataset["series"]): BarChartDataset["series"] {
	return series.map((series) => {
		const sum = series.data.reduce((acc, curr) => acc + curr.value, 0);
		return {
			...series,
			data: series.data.map((item) => ({
				...item,
				value: (item.value / sum) * 100,
			})),
		};
	});
}
