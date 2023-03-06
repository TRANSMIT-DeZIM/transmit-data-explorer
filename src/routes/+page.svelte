<script lang="ts">
	import logo from "$lib/assets/logo.png";
	import BarChart from "./BarChart.svelte";

	export let data: Record<string, any>;

	const responseVars = Object.keys(data);
	let currResponse = responseVars[0];

	$: currFacetVar = Object.keys(data[currResponse])[0];

	$: currColourVar = Object.keys(data[currResponse][currFacetVar])[0];

	let showPercentages = false;
	$: if (currResponse === "plan_mig") showPercentages = false;
</script>

<div class="grid gap-8 md:grid-cols-4 lg:grid-cols-6">
	<div>
		<div class="items-center px-4 py-3">
			<img src={logo} alt="TRANSMIT Project logo" />
		</div>
		{#each responseVars as response}
			<button
				class="btn btn-ghost btn-sm m-1 block w-full text-left"
				class:btn-active={currResponse === response}
				on:click={() => (currResponse = response)}>{response}</button
			>
		{/each}
	</div>

	<div class="col-span-3 lg:col-span-5">
		<div class="mb-8">
			<label class="cursor-pointer">
				<span class="label-text">Groups</span>
				<select class="select select-bordered select-sm m-1 mr-4" bind:value={currFacetVar}>
					{#each Object.keys(data[currResponse]) as facetBy}
						<option value={facetBy}>{facetBy}</option>
					{/each}
				</select>
			</label>

			<label class="cursor-pointer">
				<span class="label-text">Colour</span>
				<select class="select select-bordered select-sm m-1 mr-4" bind:value={currColourVar}>
					{#each Object.keys(data[currResponse][currFacetVar]) as colourBy}
						<option value={colourBy}>{colourBy}</option>
					{/each}
				</select>
			</label>

			<label class={currResponse === "plan_mig" ? "cursor-pointer hidden" : "cursor-pointer"}>
				<span class="label-text">Show percentages</span>
				<input type="checkbox" class="checkbox align-middle m-1" bind:checked={showPercentages} />
			</label>
		</div>

		<div class="grid h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
			<!-- Each category is a value of the facetting variable -->
			{#each Object.keys(data[currResponse][currFacetVar][currColourVar]) as category}
				<BarChart
					name={category}
					dataset={data[currResponse][currFacetVar][currColourVar][category]}
					{showPercentages}
				/>
			{/each}
		</div>
	</div>
</div>
