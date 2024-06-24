<script lang="ts">
	import type { ChangeEventHandler } from "./utils";
	import { createEventDispatcher } from "svelte";
	import { page } from "$app/stores";
	import Icon from "svelte-icon/Icon.svelte";
	import question from "$lib/assets/question.svg?raw";
	import logo from "$lib/assets/logo.png";

	export let responseVars;
	export let varLabels;
	export let currResponse;

	const dispatch = createEventDispatcher();

	function forwardResponse(event: ChangeEventHandler<HTMLButtonElement>) {
		dispatch("responseChange", { response: event.currentTarget.id });
	}
</script>

<div class="drawer-side">
	<label for="page-drawer" class="drawer-overlay" />

	<div class="menu w-[92%] max-w-sm bg-base-100 p-4 pr-8 text-base-content sm:w-96">
		<div class="m-4 mb-0 flex">
			<label
				for="about-modal"
				class="tooltip tooltip-bottom cursor-pointer"
				data-tip="About the project"
			>
				<img class="hover:blur-sm" src={logo} alt="TRANSMIT Project logo" />
			</label>
		</div>

		<div class="dropdown flex justify-center">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-sm"
				>{$page.url.pathname === "/" ? "MENA" : "West Africa"}</label
			>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu rounded-box w-36 bg-base-100 p-2 shadow">
				<li><a href="/">MENA</a></li>
				<li><a href="/west-africa">West Africa</a></li>
			</ul>
		</div>

		<div class="mt-4">
			{#each responseVars as response}
				<button
					class="btn btn-ghost no-animation m-1 w-full justify-start text-left"
					class:btn-active={currResponse === response}
					id={response}
					on:click={forwardResponse}
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="dropdown dropdown-hover" on:click|stopPropagation>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label tabindex="0" class="btn btn-circle btn-ghost btn-xs mr-4 opacity-40">
							<Icon data={question} />
						</label>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<div
							tabindex="0"
							class="dropdown-content rounded-box -ml-6 w-72 cursor-text select-text bg-base-100 p-4 text-left text-sm font-normal normal-case shadow-lg sm:w-[360px]"
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
