<script lang="ts">
	import '../app.pcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { base } from '$app/paths';
</script>

<div class="flownavbar">
	<Navbar fluid>
		<NavBrand href="{base}/">
			<img src="$lib/imgs/Lock_Icon.svg" style="height: 35px; width: 35px" />
			<span
				class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				style="margin-left: 7px;">Cybersecurity and You</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl >
			<NavLi href="{base}/">Home</NavLi>
			<NavLi href="{base}/about">About</NavLi>
			<NavLi href="{base}/dictionary">Dictionary</NavLi>
			<NavLi href="{base}/password">Password</NavLi>
			<NavLi href="{base}/caesar-cipher">Caesar Cipher</NavLi>
			<NavLi href="{base}/permutation-cipher">Permutation Cipher</NavLi>
			<NavLi href="{base}/permutation-cracker">Permutation Cracker</NavLi>
		</NavUl>
	</Navbar>
</div>

<slot />

<style>
	.flownavbar {
		margin-bottom: 15px;
	}
</style>
