<script lang="ts">
	import BarChart from "./BarChart.svelte";
	import { data } from "$lib/data";

	const responseVars = Object.keys(data);
	let currResponse = responseVars[0];
	$: currGroupVar = Object.keys(data[currResponse])[0];
</script>

<div class="grid gap-8 md:grid-cols-4 lg:grid-cols-6">
	<div>
		<div class="backdrop-blur items-center px-4 py-3">
			<img src="/logo.png" alt="" />
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
		<div class="mb-3">
			<span class="label-text">Groups</span>
			<select class="select select-bordered select-sm m-1" bind:value={currGroupVar}>
				{#each Object.keys(data[currResponse]) as groups}
					<option value={groups}>{groups}</option>
				{/each}
			</select>
		</div>

		<div class="grid h-[calc(100vh-72px)] grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden">
			{#each Object.keys(data[currResponse][currGroupVar]) as category}
				<BarChart name={category} dataset={data[currResponse][currGroupVar][category]} />
			{/each}
		</div>
	</div>
</div>
