<script lang="ts">
	import Icon from "svelte-icon/Icon.svelte";
	import hamburger from "$lib/assets/hamburger.svg?raw";
	import logo from "$lib/assets/logo.png";
	import ChartPanel from "./ChartPanel.svelte";

	export let data: Record<string, any>;

	const responseVars = Object.keys(data);
	let currResponse = responseVars[0];

	$: currFacetVar = Object.keys(data[currResponse])[0];

	$: currColourVar = Object.keys(data[currResponse][currFacetVar])[0];

	let showPercentages = false;
	$: if (currResponse === "plan_mig") showPercentages = false;
</script>

<div class="drawer drawer-mobile">
	<input id="page-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col p-4">
		<span
			class="flex items-center mb-4 w-60 lg:hidden before:text-xs before:content-[attr(data-tip)]"
		>
			<label for="page-drawer" class="btn btn-square btn-ghost drawer-button"
				><Icon data={hamburger} /></label
			>
			<img class="p-4" src={logo} alt="TRANSMIT Project logo" />
		</span>

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
				<input type="checkbox" class="toggle align-middle m-1" bind:checked={showPercentages} />
			</label>
		</div>

		<ChartPanel data={data[currResponse][currFacetVar][currColourVar]} {showPercentages} />
	</div>

	<div class="drawer-side">
		<label for="page-drawer" class="drawer-overlay" />

		<div class="menu p-4 pr-8 w-80 bg-base-100 text-base-content">
			<div class="p-4 hidden lg:block">
				<img src={logo} alt="TRANSMIT Project logo" />
			</div>

			<div class="mt-4">
				{#each responseVars as response}
					<button
						class="btn btn-ghost btn-sm m-1 block w-full text-left"
						class:btn-active={currResponse === response}
						on:click={() => (currResponse = response)}>{response}</button
					>
				{/each}
			</div>
		</div>
	</div>
</div>
