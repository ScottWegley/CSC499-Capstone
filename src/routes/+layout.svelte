<script lang="ts">
	import '../app.pcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div class="flownavbar">
	<Navbar fluid>
		<NavBrand href="/">
			<img src="$lib/imgs/Lock_Icon.svg" style="height: 35px; width: 35px" />
			<span
				class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				style="margin-left: 7px;">Cybersecurity and You</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl >
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/dictionary">Dictionary</NavLi>
			<NavLi href="/password">Password</NavLi>
		</NavUl>
	</Navbar>
</div>

<slot />

<style>
	.flownavbar {
		margin-bottom: 15px;
	}
</style>
