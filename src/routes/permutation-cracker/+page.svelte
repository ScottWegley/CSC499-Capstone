<script lang="ts">
	import { getCipherAlphabet } from '$lib/scripts/Ciphers/CaesarCipher';
	import { CaesarCrack } from '$lib/scripts/Cracking/Caesar/CaesarCrack';
	import { CaesarResultData } from '$lib/scripts/Cracking/Caesar/CaesarResultData';
	import { PermutationCrack } from '$lib/scripts/Cracking/Permutation/PermutationCrack';
	import { PermutationResultData } from '$lib/scripts/Cracking/Permutation/PermutationResultData';
	import { WordRuleSet } from '$lib/scripts/Util/WordRuleSet';
	import { DEFAULT_ALPHABET, Dictionary, sanitizeInput } from '$lib/scripts/Util/Dictionary';
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
		Input,
		Select,
		Kbd,
		Modal
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { PossibleCharacterSet } from '$lib/scripts/Cracking/Permutation/PossibleCharacterSet';

	// #region Global Settings & Functions
	// PERMED VERSION OF INPUT TEXT
	/** Stores the text given to us by the user. */
	$: inputText =
		"EKGXXIBT QGUODHPHF LWBNQIDBPK I PU QVG EDDY FDW XVPKK HGPR QVIX RPF P NHIXIX EGLPKKX QVG KPBR CVPQGJGH QVDWTVQX PHG IUODXXIEKG";
	// $: inputText = "BLESSING TEMPORARY FUNCTIONAL I AM THE BOOK YOU SHALL READ THIS DAY A CRISIS BEFALLS THE LAND WHATEVER THOUGHTS ARE IMPOSSIBLE";
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

	/** Make sure the dictionary has been loaded so we don't do async shenanigans.*/
	onMount(async () => {
		await Dictionary.syncDictionary();
		if (caesarMode) {
			caesarCrack();
		}
	});

	/** Storage of all words from the dictionary that showed up in any result. */
	let realWordSet = new Set<String>();
	/** Function to add things to our real word set. */
	function addToRealWords(word: string) {
		realWordSet.add(word);
	}

	/** Push unique items for the analysis dropdown. */
	function generateWordAnalysisItems(input: string) {
		let items: { value: string; name: string }[] = [];
		let tempSet = new Set<string>();

		input.split(' ').forEach((i) => {
			tempSet.add(i);
		});
		tempSet.forEach((i, j, k) => {
			items.push({ value: i, name: i });
		});
		return items;
	}
	// #endregion

	// #region Permutation Cracking Data Storage & Functions
	/** Represents the character the user would like to view the possible character equivalents to.  Defaults to first letter of alphabet. */
	let selectedPossibilityCharacter = DEFAULT_ALPHABET[0];
	/** Variable to update whenever we want to refresh permutation crack dependent components. */
	let permutationUpdateTracker = 0;

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
	let permutationCrack: PermutationCrack = new PermutationCrack(inputText);

	/** Function that hits a variable with an update.  Permutation components listen to that variable and rerender.*/
	function updatePermutationComponents() {
		permutationUpdateTracker++;
	}

	/** Function to start the cracking process. */
	function startCracking() {
		resetPermutationCracking();
		crackInProgress = true;
	}

	/** The current word the user wants to analyze to reduce the possibilities. */
	let wordToAnalyze = '';
	/** Tracks whether the analysis modal is open. */
	let analysisCustomizationWindow = false;
	/** Tracks how many times the batch analysis is supposed to run. */
	let batchAnalysisCount = 1;

	/** Runs our analysis and subsequent reduction functions on the selected word. */
	function analyzeButtonClick(e: Event) {
		if (
			(inputText.indexOf(wordToAnalyze) == -1 || wordToAnalyze.length < 1) &&
			!(e as PointerEvent).shiftKey
		) {
			console.log('Select a word before attempting to analyze.');
			return;
		}
		if ((e as PointerEvent).shiftKey) {
			analysisCustomizationWindow = true;
		} else {
			let rules = new WordRuleSet(wordToAnalyze);
			let matches = Dictionary.getMatchingWords(
				rules,
				wordToAnalyze,
				permutationCrack.getPossibleCharacterSet()
			);
			if (matches.length == 0) {
				console.log('No word matches for ' + wordToAnalyze);
				// ALERT USER NO MATCHES
			} else {
				let resultingPossibleChars = new PossibleCharacterSet(wordToAnalyze, matches);
				permutationCrack
					.getPossibleCharacterSet()
					.reduceToOverlappingPossibilities(resultingPossibleChars);
				updatePermutationComponents();
			}
		}
	}

	function runBatchAnalysis(rounds: number) {
		for (let i = 0; i < rounds; i++) {
			generateWordAnalysisItems(inputText).forEach((item) => {
				let rules = new WordRuleSet(item.name);
				let matches = Dictionary.getMatchingWords(
					rules,
					item.name,
					permutationCrack.getPossibleCharacterSet()
				);
				if (matches.length == 0) {
					console.log('No word matches for ' + item.name);
					// ALERT USER NO MATCHES
				} else {
					let resultingPossibleChars = new PossibleCharacterSet(item.name, matches);
					permutationCrack
						.getPossibleCharacterSet()
						.reduceToOverlappingPossibilities(resultingPossibleChars);
					updatePermutationComponents();
				}
			});
		}
		analysisCustomizationWindow = false;
	}

	/** Function to reset the permutation cracker to their default state. */
	function resetPermutationCracking() {
		crackInProgress = false;
		wordToAnalyze = '';
		analysisCustomizationWindow = false;
		selectedPossibilityCharacter = DEFAULT_ALPHABET[0];
		permutationResults = new PermutationResultData([], [], [], 0, 0, false);
		permutationCrack = new PermutationCrack(
			inputText,
			0,
			0,
			true,
			() => {},
			updatePermutationComponents
		);
	}
	// #endregion

	// #region Caesar Data and Functions
	/** Public access for the results of a caesar crack. */
	let caesarResults: CaesarResultData = new CaesarResultData([], [], [], 0, 0, false);

	/** This function calls a Caesar Crack into existence, cracks, and then gets the results data, before printing the results.*/
	function caesarCrack() {
		let caesarCracker = new CaesarCrack(
			inputText,
			accuracyThreshold / 100,
			returnPercentage / 100,
			ascendingResults,
			addToRealWords
		);
		caesarResults = caesarCracker.getMutatedResultsData();
		crackInProgress = false;
	}

	/** Pair words to whether or not they are accurate for colored display in table. */
	function generateDisplayForResult(result: string) {
		let displayWords: { text: string; accurate: boolean }[] = [];
		result.split(' ').forEach((x) => {
			displayWords.push({ text: x + ' ', accurate: realWordSet.has(x) });
		});
		return displayWords;
	}
	// #endregion

	function debugButton(e: Event) {
		if ((e as PointerEvent).shiftKey) {
		} else {
			let rules = new WordRuleSet(wordToAnalyze);
			console.log(rules.toString());
			let matches = Dictionary.getMatchingWords(
				rules,
				wordToAnalyze,
				permutationCrack.getPossibleCharacterSet()
			);
			if (matches.length == 0) {
				console.log('No word matches.');
				// ALERT USER NO MATCHES
			} else {
				console.log(matches);
				let resultingPossibleChars = new PossibleCharacterSet(wordToAnalyze, matches);
				console.log(resultingPossibleChars.toString());
				permutationCrack
					.getPossibleCharacterSet()
					.reduceToOverlappingPossibilities(resultingPossibleChars);
				updatePermutationComponents();
			}
		}
	}
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Permutation Cracker</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page hosts a tool for cracking text encrypted by a Permutation Cipher. Due to the nature of
		a Permutation Cipher, it will crack text encrypted by a Caesar Cipher too. Tooltips on every
		element are enabled by default and recommended if this is your first time with this tool. Hover
		over an element to see these tips. For this tool to work, I recommend that you use an incredibly
		lengthy word list for permutation cracking. If a word in your encrypted text is not in the
		dictionary you use, this tool may not work. Your browser may stall while running a number of the
		functions of this page; give it time to finish.
	</P>
	<div class="flex w-full flex-col content-center items-center justify-center">
		<div class="flex w-full flex-row justify-center justify-self-center" id="panel-parent">
			<!-- #region Application Settings -->
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
						<Tooltip class="max-w-64"
							>If you know your input text was encrypted with specifically a Caesar Cipher, turn
							this switch on. The page will use Caesar specific cracking techniques and decrypt the
							text exponentially faster.
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
						<Tooltip class="max-w-64">
							Determines what percentage of a result must be words in the specified dictionary to be
							displayed.
						</Tooltip>
					{/if}
					<Range
						class="mb-3"
						size="sm"
						bind:value={accuracyThreshold}
						on:change={caesarCrack}
						min="0"
						max="100"
					/>

					<Label class="mb-1.5">{'Percentage Returned: ' + returnPercentage + '%'}</Label>
					{#if tooltipsActive}
						<Tooltip class="max-w-64">
							Determines what percentage of the results should be shown after all other filtering is
							done.
						</Tooltip>
					{/if}
					<Range
						size="sm"
						bind:value={returnPercentage}
						on:change={caesarCrack}
						min="0"
						max="100"
					/>
				</div>
			</Card>
			<!-- #endregion -->
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
					disabled={caesarMode || crackInProgress}
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
			<!-- #region Permutation Interaction Panel -->
			{#if !caesarMode && crackInProgress}
				<Card class="ml-1 mr-1 min-w-fit">
					<div class="flex max-w-fit flex-col justify-center" id="permutation-panel">
						<!-- #region Display ALphabet -->
						<div id="alphabet-display" class="mb-3 flex flex-col">
							<div id="first-half-alphabet" class="mb-1 mt-1">
								<ButtonGroup>
									{#each DEFAULT_ALPHABET.slice(0, Math.floor(DEFAULT_ALPHABET.length / 2)) as letter}
										{#key permutationUpdateTracker}
											<Button
												class="max-w-2 text-center"
												size="xs"
												outline={selectedPossibilityCharacter != letter}
												color={permutationCrack.getPossibleCharacterSet().getPossibilitiesForLetter(letter)
													.size > 0
													? permutationCrack.getPossibleCharacterSet().getPossibilitiesForLetter(letter)
															.size == 1
														? 'green'
														: 'yellow'
													: 'red'}
												on:click={() => {
													selectedPossibilityCharacter = letter;
												}}>{letter}</Button
											>
										{/key}
									{/each}
								</ButtonGroup>
							</div>
							<div id="second-half-alphabet" class="mb-1 mt-1">
								<ButtonGroup>
									{#each DEFAULT_ALPHABET.slice(Math.floor(DEFAULT_ALPHABET.length / 2), DEFAULT_ALPHABET.length) as letter}
										{#key permutationUpdateTracker}
											<Button
												class="max-w-2 text-center"
												size="xs"
												outline={selectedPossibilityCharacter != letter}
												color={permutationCrack.getPossibleCharacterSet().getPossibilitiesForLetter(letter)
													.size > 0
													? permutationCrack.getPossibleCharacterSet().getPossibilitiesForLetter(letter)
															.size == 1
														? 'green'
														: 'yellow'
													: 'red'}
												on:click={() => {
													selectedPossibilityCharacter = letter;
												}}>{letter}</Button
											>
										{/key}
									{/each}
								</ButtonGroup>
							</div>
						</div>
						{#if tooltipsActive}
							<Tooltip
								>This section displays what every letter of the alphabet could be <br /> equivalent
								to in the permutation cipher we are looking for.<br /> Letters turn green if they are
								solved, and red if they are not involved.</Tooltip
							>
						{/if}
						<!-- #endregion -->
						<div id="permutation-settings">
							<div id="character-possibility" class="text-left">
								{#key permutationUpdateTracker}
									<Label class="block"
										><span class="text-xs">Letter {selectedPossibilityCharacter} Could Be</span
										></Label
									>
									<Input
										size="sm"
										disabled
										value={[
											...permutationCrack
												.getPossibleCharacterSet()
												.getPossibilitiesForLetter(selectedPossibilityCharacter)
										]
											.toString()
											.replaceAll(',', '')
											.trim()}
									></Input>
									<Label class="mt-1 block"
										><span class="text-xs"
											>{permutationCrack.getPossibleCharacterSet().calculatePossibleAlphabets()} Remaining
											Alphabets</span
										></Label
									>
								{/key}
							</div>
							<div id="reduce-by-word" class="mt-3 text-left">
								<Label
									><span class="text-xs">Word to Analyze</span>
									<div class="flex flex-row items-center justify-center">
										<Select
											class="mr-1 mt-1"
											size="sm"
											items={generateWordAnalysisItems(inputText)}
											bind:value={wordToAnalyze}
										></Select>
										<Button class="mt-1" size="xs" color="purple" on:click={analyzeButtonClick}
											>Analyze</Button
										>
										{#if tooltipsActive}
											<Tooltip class="max-w-64 text-center">
												When you run word analysis, we look for patterns in the selected word and
												use it to reduce the number of possible alphabets. Press <Kbd
													class="px-1.5 py-1">shift</Kbd
												> and click for customization options.
											</Tooltip>
										{/if}
										<!-- #region Analysis Modal -->
										<Modal size="xs" bind:open={analysisCustomizationWindow}>
											<div class="flex flex-col items-center justify-center text-center">
												<Heading tag="h5" class="mb-4">Batch Analysis</Heading>
												<div class="text-left">
													<Label><span class="text-xs">Batch Analysis Rounds</span></Label>
													<div class="mt-1 flex flex-col items-center text-center">
														<Input
															type="number"
															bind:value={batchAnalysisCount}
															size="sm"
															class="w-36"
															on:change={() => {
																if (batchAnalysisCount < 1) {
																	batchAnalysisCount = 1;
																}
															}}
														></Input>
														<Button
															size="xs"
															class="mt-1 w-36"
															color="purple"
															outline
															on:click={() => {
																runBatchAnalysis(batchAnalysisCount);
															}}>Run Batch Analysis</Button
														>
														{#if tooltipsActive}
															<Tooltip class="max-w-64">
																This will iterate over every word in your input text and run the
																analysis however many times you specify.
															</Tooltip>
														{/if}
													</div>
												</div>
											</div>
										</Modal>
										<!-- #endregion -->
									</div>
								</Label>
							</div>
							<Button on:click={debugButton} class="mt-3"></Button>
						</div>
					</div>
				</Card>
			{/if}
			<!-- #endregion -->
		</div>
		<div class="mt-3 flex flex-row justify-center justify-self-center" id="table-div">
			<!-- #region Caesar Results Table -->
			{#if displayResults && caesarMode}
				<Table shadow>
					<TableHead>
						<TableHeadCell class="text-xs">Accuracy</TableHeadCell>
						<TableHeadCell class="text-xs"
							>Results {'(' + caesarResults.getResultCount() + ' Total)'}</TableHeadCell
						>
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
									><Tooltip>
										Shift of {caesarResults.getShifts()[i]}
									</Tooltip></TableBodyCell
								>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			{/if}
			<!-- #endregion -->
			<!-- #region Permutation Results Table -->
			{#if displayResults && false}
				<!--TODO: Edit this table for permutation results eventually-->
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
			<!-- #endregion -->
		</div>
	</div>
</div>

<style>
</style>
