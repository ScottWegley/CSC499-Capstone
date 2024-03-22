<script lang="ts">
	import { DEFAULT_ALPHABET, getCipherAlphabet } from '$lib/scripts/Ciphers/CaesarCipher';
	import { CaesarCrack } from '$lib/scripts/Cracking/Caesar/CaesarCrack';
	import { CaesarResultData } from '$lib/scripts/Cracking/Caesar/CaesarResultData';
	import { PermutationCrack } from '$lib/scripts/Cracking/Permutation/PermutationCrack';
	import { PermutationResultData } from '$lib/scripts/Cracking/Permutation/PermutationResultData';
	import { Dictionary, sanitizeInput } from '$lib/scripts/Dictionary';
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
		TableBodyRow,
		ButtonGroup,
		Input
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

	/** Stores the text given to us by the user. */
	let inputText = 'THIS IS A TEST';
	/** Stores whether or not tooltips should be shown. */
	let tooltipsActive = true;
	/** Tracks whether the page is in Caesar mode or not. */
	let caesarMode = false;
	/** Tracks whether or not we are currently permutation cracking. */
	let crackInProgress = false;
	/** Tracks the current threshold for accuracy reporting. */
	let accuracyThreshold = 0;
	/** Tracks what percentage of the results should be displayed to the user.*/
	let returnPercentage = 100;
	/** Whether the results should be displayed in ascending order. */
	let ascendingResults = false;
	/** Whether or not the results should be displayed. */
	let displayResults = true;
	/** Represents the character the user would like to view the possible character equivalents to.  Defaults to first letter of alphabet. */
	let selectedPossibilityCharacter = DEFAULT_ALPHABET[0];
	/** Variable to update whenever we want to refresh permutation crack dependent components. */
	let permutationUpdateTracker = 0;

	/** Public access for the results of a caesar crack. */
	let caesarResults: CaesarResultData = new CaesarResultData([], [], [], 0, 0, false);
	/** Public access for the results of a permutation crack. */
	let permutationResults: PermutationResultData = new PermutationResultData(
		[],
		[],
		[],
		0,
		0,
		false
	);
	/** Public access and storage for our Permutation Crack*/
	let permutationCrack: PermutationCrack = new PermutationCrack(
		'',
		0,
		0,
		true,
		() => {},
		updatePermutationComponents
	);

	function updatePermutationComponents() {
		permutationUpdateTracker++;
	}

	/** Make sure the dictionary has been loaded so we don't do async shenanigans. ''*/
	onMount(async () => {
		await Dictionary.syncDictionary();
		if (caesarMode) {
			caesarCrack();
		}
	});

	/** Function to start the cracking process. */
	function startCracking() {
		crackInProgress = true;
		realWordSet = new Set<String>();
	}

	/** Storage of all words from the dictionary that showed up in any result. */
	let realWordSet = new Set<String>();
	/** Function to add things to our real word set. */
	function addToRealWords(word: string) {
		realWordSet.add(word);
	}

	/** Pair words to whether or not they are accurate for colored display in table. */
	function generateDisplayForResult(result: string) {
		let displayWords: { text: string; accurate: boolean }[] = [];
		result.split(' ').forEach((x) => {
			displayWords.push({ text: x + ' ', accurate: realWordSet.has(x) });
		});
		return displayWords;
	}

	/** Function to reset the permutation cracker to their default state. */
	function resetPermutationCracking() {}

	/** This function calls a Caesar Crack into existence, cracks, and then gets the results data, before printing the results.*/
	function caesarCrack() {
		realWordSet = new Set<String>();
		let caesarCracker = new CaesarCrack(
			inputText,
			accuracyThreshold / 100,
			returnPercentage / 100,
			ascendingResults,
			addToRealWords
		);
		caesarCracker.crack();
		caesarResults = caesarCracker.getMutatedResultsData();
		crackInProgress = false;
	}

	function debugButton(e: Event) {
		if ((e as PointerEvent).shiftKey) {
			DEFAULT_ALPHABET.forEach((l) => {
				for (let index = 0; index < 23; index++) {
					permutationCrack.removeLettersFromPossible(
						l,
						permutationCrack.getPossibleCharacters(l)[0]
					);
				}
			});
		} else {
			permutationCrack.removeLettersFromPossible(
				selectedPossibilityCharacter,
				permutationCrack.getPossibleCharacters(selectedPossibilityCharacter)[0]
			);
		}
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
	<div class="flex w-full flex-col content-center items-center justify-center">
		<div class="flex w-full flex-row justify-center justify-self-center" id="panel-parent">
			<Card class="min-w-5/6 mr-1 max-w-fit">
				<div class="min-w-5/6 flex flex-col justify-center" id="control-panel">
					<Toggle size="small" bind:checked={tooltipsActive} class="mb-3">Toggle Tooltips</Toggle>
					{#if tooltipsActive}
						<Tooltip>Toggle this switch to turn tooltips on/off</Tooltip>
					{/if}
					<Toggle
						size="small"
						bind:checked={caesarMode}
						class="mb-4"
						on:click={() => {
							caesarCrack();
						}}>Caesar Cipher Mode</Toggle
					>
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
			<div class="ml-1 mr-1 flex w-5/12 flex-col justify-center" id="inputs-panel">
				<Textarea
					placeholder="Input Text"
					rows="4"
					class="mb-3 resize-none"
					bind:value={inputText}
					on:change={() => {
						inputText = sanitizeInput(inputText);
						if (caesarMode) {
							caesarCrack();
						} else {
							resetPermutationCracking();
						}
					}}
					align="center"
				></Textarea>
				{#if tooltipsActive}
					<Tooltip>Inputs with non-letter characters will be sanitized on entry.</Tooltip>
				{/if}
				<Button
					class="mb-3"
					disabled={caesarMode && !crackInProgress}
					on:click={() => {
						startCracking();
					}}>Start Cracking</Button
				>
				{#if tooltipsActive}
					{#if caesarMode}
						<Tooltip
							>Press crack to generate the potential results with the settings <br />specified in
							the panel to the left. Does not apply for Caesar Mode.</Tooltip
						>
					{/if}
				{/if}
			</div>
		</div>
		<div class="flex w-4/5 flex-col content-center justify-center">
			<div class="mt-3 flex flex-row justify-center justify-self-center" id="table-div">
				{#if displayResults && caesarMode}
					<Table shadow>
						<TableHead>
							<TableHeadCell class="text-xs">Accuracy</TableHeadCell>
							<TableHeadCell class="text-xs">Results</TableHeadCell>
							<TableHeadCell class="text-xs">Alphabet</TableHeadCell>
						</TableHead>
						{#if tooltipsActive && realWordSet.size != 0}
							<Tooltip>Red words were not found in dictionary you are using.</Tooltip>
						{/if}
						<TableBody>
							{#each caesarResults.getResults() as result, i}
								<TableBodyRow>
									<TableBodyCell
										><span class="text-xs"
											>{parseFloat((caesarResults.getAccuracy()[i] * 100).toFixed(2))}%</span
										></TableBodyCell
									>
									<TableBodyCell>
										{#each generateDisplayForResult(result) as displayResult, i}
											<span class={(!displayResult.accurate ? 'text-red-500 ' : '') + 'text-xs'}
												>{displayResult.text}</span
											>
											{#if (i + 1) % 20 == 0}
												<br />
											{/if}
										{/each}
									</TableBodyCell>
									<TableBodyCell
										><span class="text-xs"
											>{getCipherAlphabet(caesarResults.getShifts()[i])
												.toString()
												.replaceAll(',', '')}</span
										></TableBodyCell
									>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				{/if}
				{#if displayResults && !caesarMode}
					<Table shadow>
						<TableHead>
							<TableHeadCell class="text-xs">Accuracy</TableHeadCell>
							<TableHeadCell class="text-xs">Results</TableHeadCell>
							<TableHeadCell class="text-xs">Alphabet</TableHeadCell>
						</TableHead>
						{#if tooltipsActive && realWordSet.size != 0}
							<Tooltip>Red words were not found in dictionary you are using.</Tooltip>
						{/if}
						<TableBody>
							{#each caesarResults.getResults() as result, i}
								<TableBodyRow>
									<TableBodyCell
										><span class="text-xs"
											>{parseFloat((caesarResults.getAccuracy()[i] * 100).toFixed(2))}%</span
										></TableBodyCell
									>
									<TableBodyCell>
										{#each generateDisplayForResult(result) as displayResult, i}
											<span class={(!displayResult.accurate ? 'text-red-500 ' : '') + 'text-xs'}
												>{displayResult.text}</span
											>
											{#if (i + 1) % 20 == 0}
												<br />
											{/if}
										{/each}
									</TableBodyCell>
									<TableBodyCell
										><span class="text-xs"
											>{getCipherAlphabet(caesarResults.getShifts()[i])
												.toString()
												.replaceAll(',', '')}</span
										></TableBodyCell
									>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
</style>
