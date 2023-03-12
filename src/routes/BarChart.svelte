<script lang="ts">
	import { Chart, type EChartsOptions } from "svelte-echarts";
	import { accordion, interpolateColours, type BarChartDataset } from "./utils";

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
			left: 36,
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
			valueFormatter: showPercentages ? (value: number) => value.toFixed(2) + "%" : undefined,
		},
		grid: {
			left: 80,
			top: showLegend ? 120 : 60,
			right: "4%",
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
				backgroundColor: "#fff",
				fillerColor: "#d2d4d7",
				borderColor: "#d2d4d7",
				handleIcon: "pin",
				handleStyle: { borderColor: "#000" },
				showDataShadow: false,
				xAxisIndex: [],
				yAxisIndex: [0],
				filterMode: "none",
				left: 12,
				width: 24,
				brushSelect: false,
			},
		],
		color: interpolateColours(
			"#194939",
			"#ed7d31",
			dataset.series.filter((series) => !series.data.some((item) => "itemStyle" in item)).length
		),
		animationDuration: 500,
	} as EChartsOptions;

	let displayChart = true;
	$: collapsedHeight = showLegend ? "100px" : "40px";
</script>

<div class="relative w-full" use:accordion={{ isOpen: displayChart, collapsedHeight }}>
	<input
		type="checkbox"
		class="toggle toggle-sm absolute z-50 {showLegend ? 'top-[60px]' : 'top-0'}"
		class:hidden={name === " "}
		bind:checked={displayChart}
	/>
	<div class={showLegend ? "h-[460px]" : "h-[420px]"}>
		<Chart {options} />
	</div>
</div>
