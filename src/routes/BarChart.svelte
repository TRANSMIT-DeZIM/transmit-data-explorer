<script lang="ts">
	import { Chart, type EChartsOptions } from "svelte-echarts";
	import { accordion, interpolateColours, type EChartsOptsData } from "./utils";

	export let name: string;
	export let dataObj: Record<string, string | number[]>;
	export let showPercentages: boolean;
	export let xVar: string;
	export let yMax: number;

	const showLegend = name !== "Türkiye" && name !== "Host";

	function makeEChartsData({ [xVar]: xValues, ...data }): EChartsOptsData {
		const missingCats = ["missing", "refuse", "refuse/don't know"];
		const missingStyle = { color: "#e3e3e3" };

		const series = Object.entries(data).map(([name, values]) => ({
			type: "bar",
			id: name,
			name,
			data: values.map((value: number) =>
				missingCats.includes(name) ? { value, itemStyle: missingStyle } : { value }
			),
		}));

		return {
			xAxis: {type: "category", data : xValues},
			series,
			legend: {
				data: series.map(({ name, ..._ }) =>
					missingCats.includes(name) ? { name, itemStyle: missingStyle } : { name }
				),
			},
		};
	}

	$: optsData = makeEChartsData(dataObj);

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
			...optsData.legend,
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
			...optsData.xAxis,
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
		series: optsData.series,
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
			optsData.series.filter((series) => !series.data.some((item) => "itemStyle" in item)).length
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
		<!-- <pre class="max-h-[calc(100vh-72px)] overflow-y-auto">{JSON.stringify(optsData, null, 4)}</pre> -->
	</div>
</div>
