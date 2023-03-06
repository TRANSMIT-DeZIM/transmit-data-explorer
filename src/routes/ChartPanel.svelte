<script lang="ts">
	import BarChart from "./BarChart.svelte";
	import { seriesValues, seriesToPercentages, type BarChartDataset } from "./utils";

	export let data: Record<string, BarChartDataset>;
	export let showPercentages: boolean;

	$: if (showPercentages) {
		Object.keys(data).forEach((category) => {
			if ("seriesPct" in data[category]) return;
			data[category].seriesPct = seriesToPercentages(data[category].series);
			console.log(Math.random());
		});
	}

	$: yMax = Math.max(
		...Object.values(data).flatMap((category) =>
			seriesValues(showPercentages ? category.seriesPct : category.series)
		)
	);
</script>

<div class="grid h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
	<!-- Each category is a value of the facetting variable -->
	{#each Object.keys(data) as category}
		<BarChart name={category} dataset={data[category]} {showPercentages} {yMax} />
	{/each}
</div>
