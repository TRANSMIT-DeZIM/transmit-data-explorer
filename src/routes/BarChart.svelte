<script lang="ts">
	import { Chart, type EChartsOptions } from "svelte-echarts";
	import { accordion, interpolateColours, type EChartsOptsData } from "./utils";

	export let name: string;
	export let dataObj: Record<string, string | number[]>;
	export let showPercentages: boolean;
	export let xVar: string;
	export let yMax: number;

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
			xAxis: { type: "category", data: xValues },
			series,
			legend: {
				data: series.map(({ name, ..._ }) =>
					missingCats.includes(name) ? { name, itemStyle: missingStyle } : { name }
				),
			},
		};
	}

	$: optsData = makeEChartsData(dataObj);

	$: showLegend = name !== "Türkiye" && name !== "Host";

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
			show: showLegend && optsData.series.length > 1,
			left: 0,
			top: 0,
			selectedMode: false,
			textStyle: { fontSize: "0.875rem" },
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			appendToBody: true,
			valueFormatter: showPercentages ? (value: number) => value.toFixed(2) + "%" : undefined,
			extraCssText: "max-width: 192px; white-space: normal",
		},
		grid: {
			left: 80,
			top: showLegend ? 112 : 52,
			right: "4%",
			bottom: showLegend ? 40 : 60,
		},
		xAxis: {
			...optsData.xAxis,
			axisLabel: {
				hideOverlap: true,
				fontSize: "0.875rem",
				width: 148,
				interval: 0,
				overflow: "break",
			},
		},
		yAxis: {
			max: Math.ceil(yMax),
			axisLabel: {
				formatter: showPercentages ? "{value}%" : "{value}",
				fontSize: "0.875rem",
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
				width: 20,
				brushSelect: false,
			},
		],
		color:
			optsData.series.length === 1
				? "#194939"
				: interpolateColours(
						"#194939",
						"#ed7d31",
						optsData.series.filter((series) => !series.data.some((item) => "itemStyle" in item))
							.length
				  ),
		textStyle: {
			fontFamily:
				'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"',
		},
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
	<div class={showLegend ? "h-[400px] lg:h-[460px]" : "h-[360px] lg:h-[420px]"}>
		<div
			class="absolute text-sm opacity-50 {showLegend && optsData.series.length === 1
				? 'visible'
				: 'invisible'}"
		>
			No variable mapped to colour
		</div>
		<Chart {options} />
	</div>
</div>
