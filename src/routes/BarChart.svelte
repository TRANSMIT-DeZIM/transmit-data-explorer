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

	const showLegend = name !== "Türkiye" && name !== "Host";

	$: options = {
		title: {
			text: name,
			textStyle: {
				fontSize: "1rem",
				fontWeight: 500,
			},
			top: showLegend ? 60 : 0,
		},
		legend: {
			...dataset.legend,
			type: "scroll",
			show: showLegend,
			left: 80,
			top: 0,
			selectedMode: false,
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			appendToBody: true,
		},
		grid: {
			left: 80,
			top: showLegend ? 120 : 60,
			bottom: showLegend ? 20 : 40,
		},
		xAxis: {
			...dataset.xAxis,
			axisLabel: {
				hideOverlap: true,
				width: 120,
				interval: 0,
				overflow: "truncate",
			},
		},
		yAxis: {
			axisLabel: {
				formatter: showPercentages ? "{value}%" : "{value}",
			},
		},
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
		dataZoom: [
			{
				handleIcon: "pin",
				showDataShadow: false,
				xAxisIndex: [],
				yAxisIndex: [0],
				filterMode: "none",
				left: 12,
				width: 24,
				brushSelect: false,
			},
		],
	} as EChartsOptions;
</script>

<div class="{showLegend ? 'h-[460px]' : 'h-[420px]'} w-full">
	<Chart {options} />
</div>
