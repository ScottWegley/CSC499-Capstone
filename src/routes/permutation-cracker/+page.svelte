<script lang="ts">
	import { Heading, P, Textarea, Card, Toggle, Tooltip, Button } from 'flowbite-svelte';

	/** Stores the text given to us by the user. */
	let inputText = '';
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Permutation Cracker</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page hosts a tool for cracking text encrypted by a Permutation Cipher. Due to the nature of
		a Permutation Cipher, it also will crack text encrypted by a Caesar Cipher. Tooltips on every
		element are enabled by default and recommended if this is your first time using this tool. Hover
		over an element to see these tips.
	</P>
	<div class="flex w-full flex-row justify-center" id="panel-parent">
		<Card class="mr-1 max-w-fit">
			<div class="flex flex-col justify-center" id="control-panel">
				<Toggle size="small" bind:checked={tooltipsActive} class="mb-3">Show Tooltips</Toggle>
				{#if tooltipsActive}
					<Tooltip>Toggle this switch to turn tooltips on/off</Tooltip>
				{/if}
				<Toggle size="small" bind:checked={caesarMode}>Caesar Mode</Toggle>
				{#if tooltipsActive}
					<Tooltip
						>If you know your input text was encrypted with specifically a Caesar Cipher, turn this
						switch on. <br/> The page will use Caesar specific cracking techniques and decrypt the text
						exponentially faster.
					</Tooltip>
				{/if}
			</div>
		</Card>
		<div class="ml-1 flex w-5/12 flex-col justify-center">
			<Textarea
				placeholder="Input Text"
				rows="4"
				class="resize-none mb-3"
				bind:value={inputText}
				on:change={() => {
					inputText = inputText.toUpperCase();
				}}
				align="center"
			></Textarea>
            <Button class="mb-3">Crack</Button>
            <Textarea
				placeholder="Output Text"
				rows="4"
				class="resize-none mb-3"
				bind:value={outputText}
				align="center"
                disabled
			></Textarea>
		</div>
	</div>
</div>

<style>
</style>
