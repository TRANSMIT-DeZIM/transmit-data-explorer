<script lang="ts">
	import { unzipObj, type ChangeEventHandler } from "./utils";
	import Icon from "svelte-icon/Icon.svelte";
	import hamburger from "$lib/assets/hamburger.svg?raw";
	import logo from "$lib/assets/logo.png";
	import { data } from "$lib/data";
	import { escape, not, op, table } from "arquero";
	import type { Struct } from "arquero/dist/types/op/op-api";
	import BarChart from "./BarChart.svelte";

	const responseVars = Object.keys(data);
	let currResponse = responseVars[0];

	const facetVars = ["Rcountry", "stratad"];
	let currFacetVar: string;
	let prevFacetVar: string;

	const filterValueSet = ["Syrian", "Host", "Lebanon", "Türkiye"];
	let currFilterVar: string;
	let currFilterOptions: string[];
	let currFilterValues = [...filterValueSet];

	let colourVars: string[];
	let currColourVar: string;
	let prevColourVar: string;

	$: {
		currFacetVar = facetVars.includes(prevFacetVar) ? prevFacetVar : facetVars[0];
		prevFacetVar = currFacetVar;

		currFilterVar = currFacetVar === "Rcountry" ? "stratad" : "Rcountry";
		currFilterOptions = currFilterVar === "stratad" ? ["Syrian", "Host"] : ["Lebanon", "Türkiye"];
	}

	$: {
		colourVars = ["agegr", "edu", "gender"].filter((x) => x !== currResponse);
		currColourVar = colourVars.includes(prevColourVar) ? prevColourVar : colourVars[0];
		prevColourVar = currColourVar;
	}

	function handleFacetChange(event: ChangeEventHandler<HTMLSelectElement>) {
		prevFacetVar = currFacetVar;
		currFacetVar = event.currentTarget.value;
		currFilterValues = [...filterValueSet];
	}

	function handleColourChange(event: ChangeEventHandler<HTMLSelectElement>) {
		prevColourVar = currColourVar;
		currColourVar = event.currentTarget.value;
	}

	let showPercentages = false;
	$: if (currResponse === "plan_mig") showPercentages = false;

	let chartData: any;
	let yMax: number;
	$: {
		const dataFiltered = table(data[currResponse]).filter(
			escape((d: Struct) => (op.includes as any)(currFilterValues, d[currFilterVar]))
		);

		let dataSummarised =
			currResponse !== "plan_mig"
				? dataFiltered
						.groupby([`${currFacetVar}`, `${currColourVar}`, `${currResponse}`])
						.rollup({ value: (d: Struct) => op.sum(d.value) })
				: dataFiltered.groupby([`${currFacetVar}`, `${currColourVar}`]).rollup({
						value: (d: Struct) =>
							Math.round(((op.sum as any)(d.value * d.weight) / op.sum(d.weight)) * 100) / 100,
				  });

		if (showPercentages) {
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

<div class="drawer-mobile drawer">
	<input id="page-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col p-4">
		<span class="mb-4 flex items-center before:text-xs before:content-[attr(data-tip)] lg:hidden">
			<label for="page-drawer" class="btn-ghost drawer-button btn-square btn mr-4">
				<Icon data={hamburger} />
			</label>
			<h1 class="text-lg font-bold uppercase">{currResponse}</h1>
		</span>

		<div class="mb-8">
			<label class="cursor-pointer">
				<span class="label-text">Groups</span>
				<select
					class="select-bordered select select-sm m-1 mr-4"
					bind:value={currFacetVar}
					on:change={handleFacetChange}
				>
					{#each facetVars as facetBy}
						<option value={facetBy}>{facetBy}</option>
					{/each}
				</select>
			</label>

			<label class="cursor-pointer">
				<span class="label-text">Filter</span>
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<label tabindex="0" class="btn-ghost btn-sm btn m-1 mr-4 border-black/20 normal-case"
						>{currFilterVar}</label
					>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="dropdown-content menu mt-[-4px] w-32 rounded-sm border-[1px] border-black/20 bg-base-100 p-2 pl-4 shadow"
					>
						{#each filterValueSet as value}
							<label class="cursor-pointer">
								<input
									type="checkbox"
									bind:group={currFilterValues}
									name="currFilterValues"
									{value}
									class="toggle toggle-xs mr-1 align-middle"
									class:hidden={!currFilterOptions.includes(value)}
								/>
								<span class="label-text" class:hidden={!currFilterOptions.includes(value)}
									>{value}</span
								>
							</label>
						{/each}
					</ul>
				</div>
			</label>

			<br class="lg:hidden" />

			<label class="cursor-pointer">
				<span class="label-text">Colour</span>
				<select
					class="select-bordered select select-sm m-1 mr-4"
					bind:value={currColourVar}
					on:change={handleColourChange}
				>
					{#each colourVars as colourBy}
						<option value={colourBy}>{colourBy}</option>
					{/each}
				</select>
			</label>

			<br class="lg:hidden" />

			<label class={currResponse === "plan_mig" ? "hidden cursor-pointer" : "cursor-pointer"}>
				<span class="label-text">Show percentages</span>
				<input type="checkbox" class="toggle m-1 align-middle" bind:checked={showPercentages} />
			</label>
		</div>
		<div class="grid max-h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
			{#each Object.keys(chartData) as facet}
				<BarChart
					name={facet}
					dataObj={unzipObj(chartData[facet])}
					{showPercentages}
					xVar={currResponse !== "plan_mig" ? currResponse : currFacetVar}
					{yMax}
				/>
			{/each}
		</div>
	</div>

	<div class="drawer-side">
		<label for="page-drawer" class="drawer-overlay" />

		<div class="menu w-80 bg-base-100 p-4 pr-8 text-base-content">
			<div class="flex p-4">
				<label
					for="about-modal"
					class="tooltip tooltip-bottom cursor-pointer"
					data-tip="About the project"
				>
					<img class="hover:blur-sm" src={logo} alt="TRANSMIT Project logo" />
				</label>
			</div>

			<div class="mt-4">
				{#each responseVars as response}
					<button
						class="btn-ghost btn-sm btn m-1 block w-full text-left"
						class:btn-active={currResponse === response}
						on:click={() => (currResponse = response)}>{response}</button
					>
				{/each}
			</div>
		</div>
	</div>

	<input type="checkbox" id="about-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative w-5/6 max-w-5xl">
			<label for="about-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
			<h3 class="text-lg font-bold">
				Transnational Perspectives on Migration and Integration (TRANSMIT)
			</h3>
			<p class="py-4">
				<a
					class="link"
					target="_blank"
					rel="noreferrer"
					href="https://www.dezim-institut.de/projekte/projekt-detail/transnational-perspectives-on-migration-and-integration-transmit-7-13/"
					>Transnational Perspectives on Migration and Integration (TRANSMIT)</a
				>
				is an infrastructure project of the
				<a
					class="link"
					target="_blank"
					rel="noreferrer"
					href="https://www.dezim-institut.de/dezim-forschungsgemeinschaft/ueber-die-forschungsgemeinschaft/"
					>DeZIM-Forschungsgemeinschaft (DeZIM FG)</a
				> and funded by the German Federal Ministry for Family Affairs, Senior Citizens, Women and Youth
				(BMFSFJ). The project studies the complex interplay between migration dynamics, migrants' well-being
				and integration processes by building a transnational data infrastructure that collects and links
				quantitative and qualitative data and knowledge on countries of origin, transit and destination.
				In addition to Turkey and Lebanon, TRANSMIT collects data in Lebanon, Morocco, Italy, Nigeria,
				Senegal, the Gambia, and Germany.
			</p>
			<p class="py-4">
				The data presented in the web application are part of an ongoing longitudinal survey of
				Syrian nationals in Turkey and Lebanon, collected by the BIM and the IAB in a joint research
				project on Transnational Migration and Integration (TRANSMIT). The study surveys a
				nationally representative sample of the respective Syrians in the two countries, as well as
				a sample of the host population living in the same neighborhoods. In the absence of reliable
				registry data, the surveys rely on stratified area sampling and random walk techniques.
			</p>
		</div>
	</div>
</div>