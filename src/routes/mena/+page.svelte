<script lang="ts">
	import { firstNonNull, unzipObj, type ChangeEventHandler } from "../utils";
	import Icon from "svelte-icon/Icon.svelte";
	import hamburger from "$lib/assets/hamburger.svg?raw";
	import { dataMena, varLabels } from "$lib/data";
	import { escape, not, op, table } from "arquero";
	import type { Struct } from "arquero/dist/types/op/op-api";
	import BarChart from "../BarChart.svelte";
	import SidebarDrawer from "../SidebarDrawer.svelte";
	import AboutModal from "../AboutModal.svelte";

	const waves = ["2020", "2022"];

	const filterOptions: Record<string, string[]> = {
		Rcountry: ["Lebanon", "Türkiye"],
		strata: ["Syrian", "Host"],
	};

	let yearData = dataMena[waves[0]];

	const responseVars = Object.keys(yearData);
	let currResponse = responseVars[0];

	const facetVars = ["Rcountry", "strata"];
	let currFacetVar = facetVars[0];
	let prevFacetVar: string;

	let currFilterVar = facetVars[1];
	let currFilterOptions = filterOptions[currFilterVar];
	let currFilterValues = currFilterOptions;

	const allColourVars = ["agegr", "gender", "edu", "none"];
	let availableColourVars = allColourVars.filter((x) => x !== currResponse);
	let currColourVar = availableColourVars[0];
	let prevColourVar: string;

	function handleWaveChange(event: ChangeEventHandler<HTMLSelectElement>) {
		yearData = dataMena[event.currentTarget.value];
		console.log(event.currentTarget.value);
	}

	function handleResponseChange(event: { detail: { response: string } }) {
		currResponse = event.detail.response;

		prevFacetVar = currFacetVar;
		currFacetVar = facetVars.includes(prevFacetVar) ? prevFacetVar : facetVars[0];

		currFilterVar = currFacetVar === "Rcountry" ? "strata" : "Rcountry";
		currFilterOptions = filterOptions[currFilterVar];

		availableColourVars = allColourVars.filter((x) => x !== currResponse);
		prevColourVar = currColourVar;
		currColourVar = availableColourVars.includes(prevColourVar)
			? prevColourVar
			: availableColourVars[0];
	}

	function handleFacetChange(event: ChangeEventHandler<HTMLSelectElement>) {
		prevFacetVar = currFacetVar;
		currFacetVar = event.currentTarget.value;

		currFilterVar = currFacetVar === "Rcountry" ? "strata" : "Rcountry";
		currFilterOptions = filterOptions[currFilterVar];
		currFilterValues = currFilterOptions;
	}

	function handleColourChange(event: ChangeEventHandler<HTMLSelectElement>) {
		prevColourVar = currColourVar;
		currColourVar = event.currentTarget.value;
	}

	let showRawCounts = false;

	let chartData: any;
	let yMax: number;
	$: {
		let dataFiltered = table(yearData[currResponse]).filter(
			escape((d: Struct) => (op.includes as any)(currFilterValues, d[currFilterVar]))
		);

		if (currColourVar === "none") {
			dataFiltered = dataFiltered.derive({ none: (_) => "" });
		}

		let dataSummarised =
			currResponse !== "plan_mig"
				? dataFiltered
						.groupby([`${currFacetVar}`, `${currColourVar}`, `${currResponse}`])
						.rollup({ value: (d: Struct) => op.sum(d.value) })
				: dataFiltered.groupby([`${currFacetVar}`, `${currColourVar}`]).rollup({
						value: (d: Struct) =>
							Math.round(((op.sum as any)(d.value * d.weight) / op.sum(d.weight)) * 100) / 100,
				  });

		if (!showRawCounts && currResponse !== "plan_mig") {
			dataSummarised = dataSummarised
				.groupby([`${currFacetVar}`, `${currColourVar}`])
				.derive({ value: (d: Struct) => (d.value / op.sum(d.value)) * 100 || 0 });
		}

		yMax = Math.max(...dataSummarised.array("value").filter(Boolean));

		const dataWide = dataSummarised
			.groupby([`${currFacetVar}`, `${currResponse}`].filter((x) => x !== "plan_mig"))
			.pivot(`${currColourVar}`, "value", { sort: false });

		chartData =
			currResponse !== "plan_mig"
				? dataWide
						.groupby(`${currFacetVar}`)
						.objects({ columns: not(`${currFacetVar}`), grouped: "object" })
				: dataWide.groupby({ key: (_d) => " " }).objects({ grouped: "object" });
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
				<span class="label-text">Year</span>
				<select class="select select-bordered select-sm m-1 mr-4" on:change={handleWaveChange}>
					<option>{waves[0]}</option>
					<option>{waves[1]}</option>
				</select>
			</span>

			<span>
				<span class="label-text">Groups</span>
				<select
					class="select select-bordered select-sm m-1 mr-4 w-32"
					bind:value={currFacetVar}
					on:change={handleFacetChange}
				>
					{#each facetVars as facetBy}
						<option value={facetBy}>
							{firstNonNull(varLabels[facetBy], "labelShort", "label")}
						</option>
					{/each}
				</select>
			</span>

			<br class="sm:hidden" />

			<span>
				<span class="label-text">Filter</span>
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<label
						tabindex="0"
						class="btn btn-ghost btn-sm no-animation m-1 mr-4 w-28 justify-start border-black/20 normal-case"
					>
						{firstNonNull(varLabels[currFilterVar], "labelShort", "label")}
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="dropdown-content menu mt-[-4px] w-32 rounded-lg border-[1px] border-black/20 bg-base-100 p-2 pl-4 shadow"
					>
						{#each currFilterOptions as value}
							<label class="cursor-pointer">
								<input
									type="checkbox"
									bind:group={currFilterValues}
									name="currFilterValues"
									{value}
									class="toggle toggle-xs mr-1 align-middle"
								/>
								<span class="label-text">{value}</span>
							</label>
						{/each}
					</ul>
				</div>
			</span>

			<br class="md:hidden" />

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

			<br class="mb-4 lg:hidden" />

			<label class={currResponse === "plan_mig" ? "hidden cursor-pointer" : "cursor-pointer"}>
				<span class="label-text">Show raw counts</span>
				<input type="checkbox" class="toggle m-1 align-middle" bind:checked={showRawCounts} />
			</label>
		</div>

		<div class="grid max-h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
			{#each Object.keys(chartData) as facet}
				<BarChart
					name={facet}
					dataObj={unzipObj(chartData[facet])}
					showPercentages={currResponse !== "plan_mig" ? !showRawCounts : false}
					xVar={currResponse !== "plan_mig" ? currResponse : currFacetVar}
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

	<AboutModal which="MENA" />
</div>
