<script lang="ts">
	import { firstNonNull, unzipObj, type ChangeEventHandler } from "./utils";
	import Icon from "svelte-icon/Icon.svelte";
	import hamburger from "$lib/assets/hamburger.svg?raw";
	import question from "$lib/assets/question.svg?raw";
	import logo from "$lib/assets/logo.png";
	import { data, varLabels } from "$lib/data";
	import { escape, not, op, table } from "arquero";
	import type { Struct } from "arquero/dist/types/op/op-api";
	import BarChart from "./BarChart.svelte";

	const responseVars = Object.keys(data);
	let currResponse = responseVars[0];

	const facetVars = ["Rcountry", "stratad"];
	let currFacetVar = facetVars[0];
	let prevFacetVar: string;

	const filterOptions: Record<string, string[]> = {
		Rcountry: ["Lebanon", "Türkiye"],
		stratad: ["Syrian", "Host"],
	};
	let currFilterVar = facetVars[1];
	let currFilterOptions = filterOptions[currFilterVar];
	let currFilterValues = currFilterOptions;

	const allColourVars = ["agegr", "gender", "edu", "none"];
	let availableColourVars = allColourVars.filter((x) => x !== currResponse);
	let currColourVar = availableColourVars[0];
	let prevColourVar: string;

	function handleResponseChange(event: ChangeEventHandler<HTMLButtonElement>) {
		currResponse = event.currentTarget.id;

		prevFacetVar = currFacetVar;
		currFacetVar = facetVars.includes(prevFacetVar) ? prevFacetVar : facetVars[0];

		currFilterVar = currFacetVar === "Rcountry" ? "stratad" : "Rcountry";
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

		currFilterVar = currFacetVar === "Rcountry" ? "stratad" : "Rcountry";
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
		let dataFiltered = table(data[currResponse]).filter(
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

<div class="drawer-mobile drawer">
	<input id="page-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col p-4">
		<span class="mb-4 flex items-center before:text-xs before:content-[attr(data-tip)] lg:hidden">
			<label for="page-drawer" class="btn-ghost drawer-button btn-square btn mr-4">
				<Icon data={hamburger} />
			</label>
			<h1 class="text-lg font-bold uppercase">{varLabels[currResponse].label}</h1>
		</span>

		<div class="mb-8 lg:mt-2">
			<span>
				<span class="label-text">Groups</span>
				<select
					class="select-bordered select select-sm m-1 mr-4 w-28"
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
						class="btn-ghost no-animation btn-sm btn m-1 mr-4 w-24 justify-start border-black/20 normal-case"
					>
						{firstNonNull(varLabels[currFilterVar], "labelShort", "label")}
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="dropdown-content menu mt-[-4px] w-32 rounded-sm border-[1px] border-black/20 bg-base-100 p-2 pl-4 shadow"
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
					class="select-bordered select select-sm m-1 mr-4 w-32"
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

			<br class="lg:hidden" />

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

	<div class="drawer-side">
		<label for="page-drawer" class="drawer-overlay" />

		<div class="menu w-80 bg-base-100 p-4 pr-8 text-base-content sm:w-96">
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
						class="btn-ghost no-animation btn m-1 w-full justify-start text-left"
						class:btn-active={currResponse === response}
						id={response}
						on:click={handleResponseChange}
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="dropdown" on:click|stopPropagation>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label tabindex="0" class="btn-ghost btn-xs btn-circle btn mr-4 opacity-40">
								<Icon data={question} />
							</label>
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<div
								tabindex="0"
								class="dropdown-content rounded-box -ml-6 w-72 select-text bg-base-100 p-4 text-left text-sm font-normal normal-case shadow-lg sm:w-[360px]"
							>
								{@html varLabels[response].question}
							</div>
						</div>
						<span class="w-48 sm:w-64">
							{varLabels[response].label}
						</span>
					</button>
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
