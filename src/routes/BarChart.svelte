<script lang="ts">
	import { Chart, type EChartsOptions } from "svelte-echarts";
	import type { BarChartDataset } from "./utils";

	export let name: string;
	export let dataset: BarChartDataset;
	export let showPercentages: boolean;
	export let yMax: number;

	const showLegend = name !== "Türkiye" && name !== "Host";

	$: options = {
		title: {
			text: name,
			textStyle: {
				fontSize: "1rem",
			},
			top: showLegend ? 60 : 0,
		},
		legend: {
			...dataset.legend,
			type: "scroll",
			show: showLegend,
			left: 0,
			top: 0,
			selectedMode: false,
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			appendToBody: true,
			valueFormatter: showPercentages ? (value: number) => value.toFixed(2) + "%" : undefined,
		},
		grid: {
			left: 80,
			top: showLegend ? 120 : 60,
			bottom: showLegend ? 24 : 44,
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
			max: Math.ceil(yMax),
			axisLabel: {
				formatter: showPercentages ? "{value}%" : "{value}",
			},
		},
		series: showPercentages ? dataset.seriesPct : dataset.series,
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
