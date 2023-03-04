<script lang="ts">
	import { Chart } from "svelte-echarts";
	import type { EChartsOptions } from "svelte-echarts";

	export let name: string;
	export let dataset: {
		xAxis: { type: string; data: string[] };
		series: {
			type: string;
			name: string;
			data: { value: number; itemStyle?: { color: string } }[];
		}[];
		legend: {
			name: string;
			itemStyle?: { color: string };
		}[];
	};
	export let showPercentages: boolean;

	$: options = {
		legend: { show: name !== "Türkiye" && name !== "Host", selectedMode: false, ...dataset.legend },
		tooltip: {},
		xAxis: dataset.xAxis,
		yAxis: showPercentages
			? { axisLabel: { formatter: "{value}%" } }
			: { axisLabel: { formatter: "{value}" } },
		series: showPercentages
			? dataset.series.map((series) => {
					const sum = series.data.reduce((acc, curr) => acc + curr.value, 0);
					return {
						...series,
						data: series.data.map((item) => ({
							...item,
							value: (item.value / sum) * 100,
						})),
					};
			  })
			: dataset.series,
	} as EChartsOptions;
</script>

<div class="h-[400px] w-full">
	<span class="font-medium">{name}</span>
	<Chart {options} />
</div>
