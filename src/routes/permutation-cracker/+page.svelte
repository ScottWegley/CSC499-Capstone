<script lang="ts">
	import { Heading, P, Textarea } from 'flowbite-svelte';

	/** Stores the text given to us by the user. */
	let inputText = '';
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Permutation Cracker</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page hosts a tool for cracking text encrypted by a Permutation Cipher. Due to the nature of
		a Permutation Pipher, it also will crack text encrypted by a Caesar Cipher. Tooltips on every
		element are enabled by default and recommended if this is your first time using this tool.
	</P>
	<Textarea
		rows="4"
		class="resize-none max-w-screen-md"
		bind:value={inputText}
		on:change={() => {
			inputText = inputText.toUpperCase();
		}}
	></Textarea>
</div>

<style>
</style>
