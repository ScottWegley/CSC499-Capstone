<script lang="ts">
	import { getCipherAlphabet } from '$lib/scripts/Ciphers/CaesarCipher';
	import { CaesarCrack } from '$lib/scripts/Cracking/CaesarCrack';
	import { CaesarResultData } from '$lib/scripts/Cracking/CaesarResultData';
	import { sanitizeInput } from '$lib/scripts/Dictionary';
	import {
		Heading,
		P,
		Textarea,
		Card,
		Toggle,
		Tooltip,
		Button,
		Range,
		Label,
		TableHeadCell,
		TableHead,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';

	/** Stores the text given to us by the user. */
	let inputText = 'UIF RVJDL CSPXO GPY KVNQT PWFS UIF MBAZ EPH';
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
	/** Whether the results should be displayed in ascending order. */
	let ascendingResults = false;
	/** Whether or not the results should be displayed. */
	let displayResults = true;

	let caesarResults: CaesarResultData = new CaesarResultData([], [], [], 0, 0, false);

	/** Function to start the cracking process. */
	async function startCracking() {
		crackInProgress = true;
		if (caesarMode) {
			await caesarCrack();
		} else {
		}
	}

	async function caesarCrack() {
		let caesarCracker = new CaesarCrack(
			inputText,
			accuracyThreshold / 100,
			returnPercentage / 100,
			ascendingResults
		);
		await caesarCracker.crack();
		caesarResults = caesarCracker.getMutatedResultsData();
		console.log(caesarResults.getResultsReport());
		crackInProgress = false;
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
	<div class="flex w-full flex-col justify-center">
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
							>If you know your input text was encrypted with specifically a Caesar Cipher, turn
							this switch on. <br /> The page will use Caesar specific cracking techniques and decrypt
							the text exponentially faster.
						</Tooltip>
					{/if}
					<Toggle size="small" bind:checked={displayResults} class="mb-3">Display Results</Toggle>
					{#if tooltipsActive}
						<Tooltip>Toggle to hide or show the results table.</Tooltip>
					{/if}
					<Toggle size="small" bind:checked={ascendingResults} class="mb-3"
						>{ascendingResults ? 'Ascending' : 'Descending'} Results</Toggle
					>
					{#if tooltipsActive}
						<Tooltip
							>Display results in {ascendingResults ? 'ascending' : 'descending'} accuracy. Click to
							toggle.</Tooltip
						>
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
					{#if tooltipsActive}
						<Tooltip>
							Determines what percentage of the results should be shown after all other filtering is
							done.
						</Tooltip>
					{/if}
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
				{#if tooltipsActive}
					{#if caesarMode}
						<Tooltip
							>Press crack to generate the potential results<br />
							with the settings specified in the panel to the left.</Tooltip
						>
					{/if}
				{/if}
			</div>
		</div>
		<div class="mt-3 flex w-full flex-row justify-center">
			{#if displayResults}
				<Table shadow>
					<TableHead>
						<TableHeadCell>Accuracy</TableHeadCell>
						<TableHeadCell>Text</TableHeadCell>
						<TableHeadCell>Alphabet</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each caesarResults.getResults() as result, i}
							<TableBodyRow>
								<TableBodyCell
									>{parseFloat((caesarResults.getAccuracy()[i] * 100).toFixed(2))}%</TableBodyCell
								>
								<TableBodyCell>{result}</TableBodyCell>
								<TableBodyCell
									>{getCipherAlphabet(caesarResults.getShifts()[i])
										.toString()
										.replaceAll(',', '')}</TableBodyCell
								>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
