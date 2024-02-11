<script lang="ts">
	import '../app.pcss';
	import {Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar fluid>
	<NavBrand href="/">
		<img src="$lib/imgs/Lock_Icon.svg" style="height: 35px; width: 35px">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style="margin-left: 7px;">Cybersecurity and You</span>
	</NavBrand>
</Navbar>

<slot />
