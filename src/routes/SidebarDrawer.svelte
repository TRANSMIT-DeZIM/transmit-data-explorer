<script lang="ts">
	import type { ChangeEventHandler } from "./utils";
	import { createEventDispatcher } from "svelte";
	import Icon from "svelte-icon/Icon.svelte";
	import question from "$lib/assets/question.svg?raw";
	import logo from "$lib/assets/logo.png";
	import { base } from "$app/paths";
	import { page } from "$app/stores";

	export let responseVars;
	export let varLabels;
	export let currResponse;

	const dispatch = createEventDispatcher();

	function forwardResponse(event: ChangeEventHandler<HTMLButtonElement>) {
		dispatch("responseChange", { response: event.currentTarget.id });
	}

	$: isWestAfrica = $page.url.pathname.startsWith(`${base}/west-africa`);
</script>

<div class="drawer-side">
	<label for="page-drawer" class="drawer-overlay" />

	<div class="menu w-[92%] max-w-sm bg-base-100 p-4 pr-8 text-base-content sm:w-96">
		<div class="m-4 mb-0 flex">
			<a href="{base}/">
				<img src={logo} alt="TRANSMIT Project logo" />
			</a>
		</div>

		<div class="flex items-center justify-center">
			<div class="dropdown flex justify-center">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-sm text-lg"
					>{isWestAfrica ? "West Africa" : "MENA"}</label
				>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="dropdown-content menu rounded-box w-40 bg-base-100 p-2 shadow">
					<li class:disabled={!isWestAfrica}><a href="{base}/mena">MENA</a></li>
					<li class:disabled={isWestAfrica}><a href="{base}/west-africa">West Africa</a></li>
				</ul>
			</div>

			<label
				for="about-modal"
				class="tooltip tooltip-bottom cursor-pointer"
				data-tip="About the project"
			>
				<sup>?</sup>
			</label>
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
