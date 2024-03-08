<script lang="ts">
	import { CaesarCracker } from '$lib/scripts/CaesarCracker';
	import { DEFAULT_ALPHABET } from '$lib/scripts/caesarCipher';
	import { checkAccuracy } from '$lib/scripts/dictionary';
	import { Heading, P, Textarea, Card, Toggle, Tooltip, Button } from 'flowbite-svelte';

	/** Stores the text given to us by the user. */
	let inputText = '';
	/** Stores the text we dsiplay to the user. */
	let outputText = '';
	/** Stores whether or not tooltips should be shown. */
	let tooltipsActive = true;
	/** Tracks whether the page is in Caesar mode or not. */
	let caesarMode = false;
	/** Tracks whether or not we are currently cracking. */
	let crackInProgress = false;

	/** Function to start the cracking process. */
	async function startCracking() {
		crackInProgress = true;
		if (caesarMode) {
			await caesarCrack();
		} else {
		}
	}

	async function caesarCrack() {
		checkAccuracy(sanitizeInput('The quick brown fox jumps over the lazy dog.'));
		let caesarCracker = new CaesarCracker(inputText);
		caesarCracker.crack();
	}

	function sanitizeInput(text: string) {
		text = text.toUpperCase();
		let output = '';
		for (let i = 0; i < text.length; i++) {
			if ((DEFAULT_ALPHABET + ' ').indexOf(text.charAt(i)) != -1) {
				output = output + text.charAt(i);
			}
		}
		return output;
	}
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
						switch on. <br /> The page will use Caesar specific cracking techniques and decrypt the text
						exponentially faster.
					</Tooltip>
				{/if}
			</div>
		</Card>
		<div class="ml-1 flex w-5/12 flex-col justify-center">
			<Textarea
				placeholder="Input Text"
				rows="4"
				class="mb-3 resize-none"
				bind:value={inputText}
				on:change={() => {
					inputText = sanitizeInput(inputText);
				}}
				align="center"
			></Textarea>
			{#if tooltipsActive}
				<Tooltip>Inputs with non-letter characters will be sanitized on entry.</Tooltip>
			{/if}
			<Button
				class="mb-3"
				on:click={async () => {
					await startCracking();
				}}>Crack</Button
			>
			<Textarea
				placeholder="Output Text"
				rows="4"
				class="mb-3 resize-none"
				bind:value={outputText}
				align="center"
				disabled
			></Textarea>
		</div>
	</div>
</div>

<style>
</style>
