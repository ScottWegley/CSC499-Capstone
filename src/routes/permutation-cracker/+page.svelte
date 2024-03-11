<script lang="ts">
	import { CaesarCracker } from '$lib/scripts/CaesarCracker';
	import { sanitizeInput } from '$lib/scripts/dictionary';
	import {
		Heading,
		P,
		Textarea,
		Card,
		Toggle,
		Tooltip,
		Button,
		Range,
		Label
	} from 'flowbite-svelte';

	/** Stores the text given to us by the user. */
	let inputText = 'UIF RVJDL CSPXO GPY KVNQT PWFS UIF MBAZ EPH';
	/** Stores the text we dsiplay to the user. */
	let outputText = '';
	/** Stores whether or not tooltips should be shown. */
	let tooltipsActive = true;
	/** Tracks whether the page is in Caesar mode or not. */
	let caesarMode = true;
	/** Tracks whether or not we are currently cracking. */
	let crackInProgress = false;
	/** Tracks the current threshold for accuracy reporting. */
	let accuracyThreshold = 0;
	/** Tracks how much of the results should be displayed to the user.*/
	let returnPercentage = 100;

	/** Function to start the cracking process. */
	async function startCracking() {
		crackInProgress = true;
		if (caesarMode) {
			await caesarCrack();
		} else {
		}
	}

	async function caesarCrack() {
		let caesarCracker = new CaesarCracker(inputText, accuracyThreshold / 100, returnPercentage/100);
		await caesarCracker.crack();
		// console.log(caesarCracker.getResultsWithAccuracy());
		console.log(caesarCracker.getResultsWithAccuracy());
		console.log(caesarCracker.getResultsSortedByAccuracy(true, true, true));
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
		<Card class="min-w-5/6 mr-1 max-w-fit">
			<div class="min-w-5/6 flex flex-col justify-center" id="control-panel">
				<Toggle size="small" bind:checked={tooltipsActive} class="mb-3">Toggle Tooltips</Toggle>
				{#if tooltipsActive}
					<Tooltip>Toggle this switch to turn tooltips on/off</Tooltip>
				{/if}
				<Toggle size="small" bind:checked={caesarMode} class="mb-4">Caesar Cipher Mode</Toggle>
				{#if tooltipsActive}
					<Tooltip
						>If you know your input text was encrypted with specifically a Caesar Cipher, turn this
						switch on. <br /> The page will use Caesar specific cracking techniques and decrypt the text
						exponentially faster.
					</Tooltip>
				{/if}
				<Label class="mb-1.5">{'Accuracy Threshold: ' + accuracyThreshold + '%'}</Label>
				{#if tooltipsActive}
					<Tooltip>
						Determines what percentage of a result must be words in the specified dictionary to be
						displayed.
					</Tooltip>
				{/if}
				<Range class="mb-3" size="sm" bind:value={accuracyThreshold} min="0" max="100" />

				<Label class="mb-1.5">{'Percentage Returned: ' + returnPercentage + '%'}</Label>
				<Range size="sm" bind:value={returnPercentage} min="0" max="100" />
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
				class="resize-none"
				bind:value={outputText}
				align="center"
				disabled
			></Textarea>
		</div>
	</div>
</div>

<style>
</style>
