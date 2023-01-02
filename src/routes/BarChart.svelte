<script lang="ts">
	import { Chart } from "svelte-echarts";
	import type { EChartsOptions } from "svelte-echarts";

	export let name: string;
	export let dataset: {
		xAxis: { type: string; data: string[] };
		series: {
			type: string;
			name: string;
			data: { value: number; itemStyle?: { color: string } };
		}[];
	};

	$: options = {
		// legend: {},
		tooltip: {},
		xAxis: dataset.xAxis,
		yAxis: {},
		series: dataset.series,
	} as EChartsOptions;
</script>

<div class="h-[400px] w-full">
	<span class="font-medium">{name}</span>
	<Chart {options} />
</div>
