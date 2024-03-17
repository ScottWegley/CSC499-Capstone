<script lang="ts">
	import '../app.pcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, MegaMenu, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { base } from '$app/paths';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	/** @type {import('./$types').LayoutData} */
	export let data;
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
		<NavUl>
			<NavLi href="{base}/">Home</NavLi>
			<NavLi href="{base}/about">About</NavLi>
			<NavLi href="{base}/dictionary">Dictionary</NavLi>
			<NavLi class="cursor-pointer">
				Ciphers and Crackers<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
			  </NavLi>
			  <Dropdown class="w-44 z-20">
				<DropdownItem href="{base}/caesar-cipher">Caesar Cipher</DropdownItem>
				<DropdownItem href="{base}/permutation-cipher">Permutation Cipher</DropdownItem>
				<DropdownItem href="{base}/permutation-cracker">Permutation Cracker</DropdownItem>
			  </Dropdown>
			<NavLi href="{base}/password">Password</NavLi>
		</NavUl>
	</Navbar>
</div>

<slot />

<style>
	.flownavbar {
		margin-bottom: 15px;
	}
</style>
