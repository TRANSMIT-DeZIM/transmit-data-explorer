<script>
	import { base } from "$app/paths";
	import logo from "$lib/assets/logo.png";
	import mapBase from "$lib/assets/map-base.svg";
	import mapMena from "$lib/assets/map-mena.svg";
	import mapWestAfrica from "$lib/assets/map-west-africa.svg";
	import AboutModal from "./AboutModal.svelte";

	let map = mapBase;
</script>

<svelte:head>
	<title>TRANSMIT Data Explorer</title>
</svelte:head>

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-xl">
			<label
				for="about-modal"
				class="tooltip tooltip-top cursor-pointer py-4"
				data-tip="About the project"
			>
				<img class="hover:blur-sm" src={logo} alt="TRANSMIT" />
			</label>
			<h1 class="text-4xl font-bold">Data Explorer</h1>

			<img
				class="py-8"
				src={map}
				alt="World map cropped down to include MENA and West African countries"
			/>
			<button
				class="btn btn-primary btn-wide m-1 text-xl"
				on:mouseenter={() => {
					map = mapMena;
				}}
				on:mouseleave={() => {
					map = mapBase;
				}}
				on:click={() => {
					window.location.href = `${base}/mena`;
				}}>MENA</button
			>
			<button
				class="btn btn-primary btn-wide m-1 text-xl"
				on:mouseenter={() => {
					map = mapWestAfrica;
				}}
				on:mouseleave={() => {
					map = mapBase;
				}}
				on:click={() => {
					window.location.href = `${base}/west-africa`;
				}}>West Africa</button
			>
		</div>
	</div>
</div>

<AboutModal which="TRANSMIT" />
