<script lang="ts">
	import { firstNonNull, unzipObj, type ChangeEventHandler } from "../utils";
	import Icon from "svelte-icon/Icon.svelte";
	import hamburger from "$lib/assets/hamburger.svg?raw";
	import { dataWestAfrica, varLabels } from "$lib/data";
	import { not, op, table } from "arquero";
	import type { Struct } from "arquero/dist/types/op/op-api";
	import BarChart from "../BarChart.svelte";
	import SidebarDrawer from "../SidebarDrawer.svelte";
	import AboutModal from "../AboutModal.svelte";

	const waves = ["1", "2"];
	let yearData = dataWestAfrica[waves[0]];

	const responseVars = Object.keys(yearData);
	let currResponse = responseVars[0];

	const currFacetVar = "Rcountry";

	const allColourVars = ["agegr", "gender", "edu", "none"];
	let availableColourVars = allColourVars.filter((x) => x !== currResponse);
	let currColourVar = availableColourVars[0];
	let prevColourVar: string;

	function handleWaveChange(event: ChangeEventHandler<HTMLSelectElement>) {
		yearData = dataWestAfrica[event.currentTarget.value];
		console.log(event.currentTarget.value);
	}

	function handleResponseChange(event: { detail: { response: string } }) {
		currResponse = event.detail.response;

		availableColourVars = allColourVars.filter((x) => x !== currResponse);
		prevColourVar = currColourVar;
		currColourVar = availableColourVars.includes(prevColourVar)
			? prevColourVar
			: availableColourVars[0];
	}

	function handleColourChange(event: ChangeEventHandler<HTMLSelectElement>) {
		prevColourVar = currColourVar;
		currColourVar = event.currentTarget.value;
	}

	let chartData: any;
	let yMax: number;
	$: {
		let dataFiltered = table(yearData[currResponse]);

		if (currColourVar === "none") {
			dataFiltered = dataFiltered.derive({ none: (_) => "" });
		}

		let dataSummarised = dataFiltered
			.groupby([`${currFacetVar}`, `${currColourVar}`, `${currResponse}`])
			.rollup({ value: (d: Struct) => op.sum(d.value) });

		yMax = Math.max(...dataSummarised.array("value").filter(Boolean));

		const dataWide = dataSummarised
			.groupby([`${currFacetVar}`, `${currResponse}`])
			.pivot(`${currColourVar}`, "value", { sort: false });

		chartData = dataWide
			.groupby(`${currFacetVar}`)
			.objects({ columns: not(`${currFacetVar}`), grouped: "object" });
	}
</script>

<svelte:head>
	<title>TRANSMIT Data Explorer</title>
</svelte:head>

<div class="drawer drawer-mobile">
	<input id="page-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col p-4">
		<span class="mb-4 flex items-center before:text-xs before:content-[attr(data-tip)] lg:hidden">
			<label for="page-drawer" class="btn btn-square btn-ghost drawer-button mr-4">
				<Icon data={hamburger} />
			</label>
			<h1 class="text-lg font-bold uppercase">{varLabels[currResponse].label}</h1>
		</span>

		<div class="mb-8 lg:mt-2">
			<span>
				<span class="label-text">Wave</span>
				<select class="select select-bordered select-sm m-1 mr-4" on:change={handleWaveChange}>
					<option>{waves[0]}</option>
					<option>{waves[1]}</option>
				</select>
			</span>

			<span>
				<span class="label-text">Colour</span>
				<select
					class="select select-bordered select-sm m-1 mr-4 w-32"
					bind:value={currColourVar}
					on:change={handleColourChange}
				>
					{#each availableColourVars as colourBy}
						<option value={colourBy}>
							{colourBy === "none"
								? "(None)"
								: firstNonNull(varLabels[colourBy], "labelShort", "label")}
						</option>
					{/each}
				</select>
			</span>

			<br class="md:hidden" />

			<span
				class={currResponse === "agegr" || currColourVar === "agegr" ? "label-text ml-2" : "hidden"}
			>
				* Includes respondents aged 25-35 in Gambia and Senegal
			</span>
		</div>

		<div class="grid max-h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
			{#each Object.keys(chartData) as facet}
				<BarChart
					name={facet}
					dataObj={unzipObj(chartData[facet])}
					showPercentages={false}
					xVar={currResponse}
					{yMax}
				/>
			{/each}
		</div>
	</div>

	<SidebarDrawer
		{responseVars}
		{varLabels}
		{currResponse}
		on:responseChange={handleResponseChange}
	/>

	<AboutModal />
</div>
