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
	/** Stores the text given to us by the user. */
	// $: inputText =
	// 	'EKGXXIBT QGUODHPHF LWBNQIDBPK I PU QVG EDDY FDW XVPKK HGPR QVIX RPF P NHIXIX EGLPKKX QVG KPBR CVPQGJGH QVDWTVQX PHG IUODXXIEKG';
	$: inputText =
		'BLESSING TEMPORARY FUNCTIONAL I AM THE BOOK YOU SHALL READ THIS DAY A CRISIS BEFALLS THE LAND WHATEVER THOUGHTS ARE IMPOSSIBLE';
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
	/** Whether or not the user has access to advanced features. */
	let advancedMode = true;

	/** Make sure the dictionary has been loaded so we don't do async shenanigans.*/
	onMount(async () => {
		await Dictionary.syncDictionary();
		if (caesarMode) {
			caesarCrack();
		}
	});

	/** Handles any switching for advanced features. */
	function toggleAdvancedMode() {
		if (advancedMode) {
			PossibleCharacterSet.disableSafety();
		} else {
			PossibleCharacterSet.enableSafety();
		}
		return;
	}

	/** Push unique items for the analysis dropdown. */
	function generateWordAnalysisItems(input: string) {
		let items: { value: string; name: string }[] = [];
		let tempSet = new Set<string>();

		input.split(' ').forEach((word) => {
			let solved: boolean = true;
			for (let i = 0; i < word.length; i++) {
				solved =
					solved && permPossibleCharacters.getPossibilitiesForLetter(word.charAt(i)).size == 1;
			}
			if (!solved) {
				tempSet.add(word);
			}
		});
		tempSet.forEach((word) => {
			items.push({ value: word, name: word });
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
	let permutationResults: PermutationResultData | undefined = undefined;
	/** Public access and storage for our Permutation Crack*/
	let permutationCrack: PermutationCrack = new PermutationCrack(inputText);
	/** Stores a mapping of characters to possible characters that the app will use. */
	let permPossibleCharacters: PossibleCharacterSet = new PossibleCharacterSet();

	/** Function that hits a variable with an update.  Permutation components listen to that variable and rerender.*/
	function updatePermutationComponents() {
		permutationUpdateTracker++;
	}

	PossibleCharacterSet.setUpdateFunction(updatePermutationComponents);

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
			let matches = Dictionary.getMatchingWords(rules, wordToAnalyze, permPossibleCharacters);
			if (matches.length == 0) {
				console.log('No word matches for ' + wordToAnalyze);
			} else {
				let resultingPossibleChars = new PossibleCharacterSet(wordToAnalyze, matches);
				permPossibleCharacters.reduceToOverlappingPossibilities(resultingPossibleChars);
			}
		}
	}

	/** Function to handle manual updates to the possible character sets. */
	function updatePossibleCharacters(e: Event) {
		let proposedCharSet = (e.srcElement as HTMLInputElement).value;
		proposedCharSet = sanitizeInput(proposedCharSet).replaceAll(' ', '').replaceAll(',', '');
		proposedCharSet = [...new Set(proposedCharSet.split(''))].join('');
		permPossibleCharacters.setPossibilitiesForLetter(
			selectedPossibilityCharacter,
			new Set(proposedCharSet.split(''))
		);

		updatePermutationComponents();
	}

	/** Function to handle manual updates to the possible character sets. */
	function updateResultPossibleCharacters(e: Event) {
		let proposedCharSet = (e.srcElement as HTMLInputElement).value;
		proposedCharSet = sanitizeInput(proposedCharSet).replaceAll(' ', '').replaceAll(',', '');
		proposedCharSet = [...new Set(proposedCharSet.split(''))].join('');
		reportPossibleCharacterSet.setPossibilitiesForLetter(
			reportPossibilityCharacter,
			new Set(proposedCharSet.split(''))
		);

		updatePermutationComponents();
	}

	function runBatchAnalysis(rounds: number) {
		for (let i = 0; i < rounds; i++) {
			generateWordAnalysisItems(inputText).forEach((item) => {
				let rules = new WordRuleSet(item.name);
				let matches = Dictionary.getMatchingWords(rules, item.name, permPossibleCharacters);
				if (matches.length == 0) {
					console.log('No word matches for ' + item.name);
					// ALERT USER NO MATCHES
				} else {
					let resultingPossibleChars = new PossibleCharacterSet(item.name, matches);
					permutationCrack;
					permPossibleCharacters.reduceToOverlappingPossibilities(resultingPossibleChars);
					updatePermutationComponents();
				}
			});
		}
		analysisCustomizationWindow = false;
	}

	/** Tracks whether the rerport modal is true. */
	let reportCustomizationWindow = false;
	/** Tracks the selected possibility character for the report generator alphabet display. */
	let reportPossibilityCharacter = DEFAULT_ALPHABET[0];
	/** The character set to be used for report generation. */
	let reportPossibleCharacterSet = new PossibleCharacterSet();

	function getResultsClick(e: Event) {
		if ((e as PointerEvent).shiftKey) {
			reportCustomizationWindow = true;
			reportPossibleCharacterSet = new PossibleCharacterSet();
			reportPossibleCharacterSet.overwrite(permPossibleCharacters);
		} else {
			console.log('Requesting results.');
			let starttime = Date.now();
			permutationResults = permutationCrack.getMutatedResultsData(permPossibleCharacters);
			console.log(`Results generated in ${(Date.now() - starttime) / 1000} Seconds`);
		}
		updatePermutationComponents();
	}

	/** Function to reset the permutation cracker to their default state. */
	function resetPermutationCracking() {
		crackInProgress = false;
		wordToAnalyze = '';
		analysisCustomizationWindow = false;
		reportCustomizationWindow = false;
		selectedPossibilityCharacter = DEFAULT_ALPHABET[0];
		permutationResults = undefined;
		permPossibleCharacters = new PossibleCharacterSet(inputText.replaceAll(' ', ''));
		reportPossibleCharacterSet = new PossibleCharacterSet(inputText.replaceAll(' ', ''));
		permutationCrack = new PermutationCrack(
			inputText,
			accuracyThreshold / 100,
			returnPercentage / 100,
			ascendingResults,
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
			ascendingResults
		);
		caesarResults = caesarCracker.getMutatedResultsData();
		crackInProgress = false;
	}

	/** Pair words to whether or not they are accurate for colored display in table. */
	function generateDisplayForResult(result: string) {
		let displayWords: { text: string; accurate: boolean }[] = [];
		result.split(' ').forEach((x) => {
			displayWords.push({ text: x + ' ', accurate: Dictionary.usedWords.has(x) });
		});
		return displayWords;
	}
	// #endregion

	function debugButton(e: Event) {
		if ((e as PointerEvent).shiftKey) {
			console.log(Dictionary.usedWords);
			console.log(Dictionary.fakeWords);
		} else {
			console.log(
				permPossibleCharacters.calculateCombinationsOvercorrection() + ' Revised Prediction'
			);
			let alphabets = permPossibleCharacters.requestPossibleAlphabets() ?? new Set<string[]>();
			console.log(alphabets.size + ' Actual Alphabets');
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
		dictionary you use, this tool may not work. Your browser may stall for up to 10 minutes while
		running a number of the functions of this page; give it time to finish.
	</P>
	<div class="flex w-full flex-col content-center items-center justify-center">
		<div class="flex w-full flex-row justify-center justify-self-center" id="panel-parent">
			<!-- #region Application Settings -->
			<Card class="min-w-5/6 mr-1 max-w-fit">
				<div class="min-w-5/6 flex flex-col justify-center" id="control-panel">
					<Toggle
						size="small"
						bind:checked={advancedMode}
						class="mb-3"
						on:change={toggleAdvancedMode}>Advanced Mode</Toggle
					>
					{#if tooltipsActive}
						<Tooltip>Enables advanced feeatures of the app. USE AT YOUR OWN RISK.</Tooltip>
					{/if}
					<Toggle size="small" bind:checked={tooltipsActive} class="mb-3">Toggle Tooltips</Toggle>
					{#if tooltipsActive}
						<Tooltip>Toggle this switch to turn tooltips on/off</Tooltip>
					{/if}
					<Toggle
						size="small"
						bind:checked={caesarMode}
						class="mb-4"
						on:change={() => {
							if (caesarMode) {
								caesarCrack();
							}
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
					<Toggle
						size="small"
						bind:checked={ascendingResults}
						on:change={() => {
							if (caesarMode) {
								caesarCrack;
							} else {
								permutationResults = undefined;
							}
						}}
						class="mb-3">{ascendingResults ? 'Ascending' : 'Descending'} Results</Toggle
					>
					{#if tooltipsActive}
						<Tooltip
							>Toggle to show results in {!ascendingResults ? 'ascending' : 'descending'} accuracy.
						</Tooltip>
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
						on:change={() => {
							if (caesarMode) {
								caesarCrack;
							} else {
								permutationResults = undefined;
							}
						}}
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
						on:change={() => {
							if (caesarMode) {
								caesarCrack;
							} else {
								permutationResults = undefined;
							}
						}}
						min="0"
						max="100"
					/>
				</div>
			</Card>
			<!-- #endregion -->
			<!-- #region Inputs Area -->
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
			<!-- #endregion -->
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
												color={permPossibleCharacters.getPossibilitiesForLetter(letter).size > 0
													? permPossibleCharacters.getPossibilitiesForLetter(letter).size == 1
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
												color={permPossibleCharacters.getPossibilitiesForLetter(letter).size > 0
													? permPossibleCharacters.getPossibilitiesForLetter(letter).size == 1
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
							<!-- #region Display Possible Characters -->
							<div id="character-possibility" class="text-left">
								{#key permutationUpdateTracker}
									<Label class="block"
										><span class="text-xs">Letter {selectedPossibilityCharacter} Could Be</span
										></Label
									>
									<Input
										size="sm"
										disabled={!advancedMode}
										value={[
											...permPossibleCharacters.getPossibilitiesForLetter(
												selectedPossibilityCharacter
											)
										]
											.toString()
											.replaceAll(',', '')
											.trim()}
										on:change={updatePossibleCharacters}
									></Input>
									<Label class="mt-1 block"
										><span class="text-xs"
											>At Most <span
												class={permPossibleCharacters.calculateCombinationsOvercorrection() <
												PossibleCharacterSet.getSafeGenerationLimit()
													? 'text-green-600'
													: 'text-red-600'}
												>{permPossibleCharacters
													.calculateCombinationsOvercorrection()
													.toLocaleString()}</span
											> Remaining Alphabets</span
										></Label
									>
									{#if tooltipsActive}
										<Tooltip class="max-w-64 text-center">
											It is not reccomended to generate a report if there are more than 100,000,000
											Alphabets remaining.
										</Tooltip>
									{/if}
								{/key}
							</div>
							<!-- #endregion -->
							<!-- #region Analyze Words -->
							<div id="reduce-by-word" class="mt-3 text-left">
								<Label
									><span class="text-xs">Word to Analyze</span>
									<div class="flex flex-row items-center justify-center">
										{#key permutationUpdateTracker}
											<Select
												class="mr-1 mt-1"
												size="sm"
												items={generateWordAnalysisItems(inputText)}
												bind:value={wordToAnalyze}
											></Select>
										{/key}
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
							<!-- #endregion -->
							<!-- #region Result Generation -->
							<div id="result-generation-buttons" class="mt-3">
								<Button class="w-full" on:click={getResultsClick}>Get Results</Button>
								{#if tooltipsActive}
									<Tooltip
										>Shift click if you want to customize your report before generating.</Tooltip
									>
								{/if}
								<!-- #region Report Modal -->
								<Modal size="lg" bind:open={reportCustomizationWindow}>
									<div class="flex flex-col items-center justify-center text-center">
										<Heading tag="h5" class="mb-1">Report Generator</Heading>
										<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
											This window allows you to customize your report before you generate it. Any
											report may not contain the full answer, but it might contain clues that bring
											you closer to it. Changes to these displayed possible characters will not
											affect the main page; they only alter the report you generate.
										</P>
										<!-- #region Display Possible Characters - Result Generation -->
										<div>
											<div class="mb-1 mt-1">
												<ButtonGroup>
													{#each DEFAULT_ALPHABET.slice(0, Math.floor(DEFAULT_ALPHABET.length / 2)) as letter}
														{#key permutationUpdateTracker}
															<Button
																class="max-w-2 text-center"
																size="xs"
																outline={reportPossibilityCharacter != letter}
																color={reportPossibleCharacterSet.getPossibilitiesForLetter(letter)
																	.size > 0
																	? reportPossibleCharacterSet.getPossibilitiesForLetter(letter)
																			.size == 1
																		? 'green'
																		: 'yellow'
																	: 'red'}
																on:click={() => {
																	reportPossibilityCharacter = letter;
																}}>{letter}</Button
															>
														{/key}
													{/each}
												</ButtonGroup>
											</div>
											<div class="mb-1 mt-1">
												<ButtonGroup>
													{#each DEFAULT_ALPHABET.slice(Math.floor(DEFAULT_ALPHABET.length / 2), DEFAULT_ALPHABET.length) as letter}
														{#key permutationUpdateTracker}
															<Button
																class="max-w-2 text-center"
																size="xs"
																outline={reportPossibilityCharacter != letter}
																color={reportPossibleCharacterSet.getPossibilitiesForLetter(letter)
																	.size > 0
																	? reportPossibleCharacterSet.getPossibilitiesForLetter(letter)
																			.size == 1
																		? 'green'
																		: 'yellow'
																	: 'red'}
																on:click={() => {
																	reportPossibilityCharacter = letter;
																}}>{letter}</Button
															>
														{/key}
													{/each}
												</ButtonGroup>
											</div>
											<div class="text-left">
												{#key permutationUpdateTracker}
													<Label class="block"
														><span class="text-xs"
															>Letter {reportPossibilityCharacter} Could Be</span
														></Label
													>
													<Input
														size="sm"
														disabled={!advancedMode}
														value={[
															...reportPossibleCharacterSet.getPossibilitiesForLetter(
																reportPossibilityCharacter
															)
														]
															.toString()
															.replaceAll(',', '')
															.trim()}
														on:change={updateResultPossibleCharacters}
													></Input>
													<Label class="mt-1 block"
														><span class="text-xs"
															>At Most <span
																class={reportPossibleCharacterSet.calculateCombinationsOvercorrection() <
																PossibleCharacterSet.getSafeGenerationLimit()
																	? 'text-green-600'
																	: 'text-red-600'}
																>{reportPossibleCharacterSet
																	.calculateCombinationsOvercorrection()
																	.toLocaleString()}</span
															> Remaining Alphabets</span
														></Label
													>
													{#if tooltipsActive}
														<Tooltip class="max-w-64 text-center">
															It is not reccomended to generate a report if there are more than
															{PossibleCharacterSet.getSafeGenerationLimit().toLocaleString()} Alphabets
															remaining.
														</Tooltip>
													{/if}
												{/key}
											</div>
											<!-- #endregion -->
											<div>
												<Button
													class="mt-1"
													on:click={() => {
														permutationCrack.getMutatedResultsData(reportPossibleCharacterSet);
														updatePermutationComponents();
													}}>Generate Results</Button
												>
											</div>
										</div>
									</div></Modal
								>
								<!-- #endregion -->
							</div>
							<!-- #endregion -->
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
							>Results {'(' + caesarResults.getResultCount() + ' Total)'} || Red words were not present
							in the dictionary</TableHeadCell
						>
						<TableHeadCell class="text-xs">Alphabet</TableHeadCell>
					</TableHead>

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
			{#if displayResults && permutationResults !== undefined && !caesarMode}
				<Table shadow>
					<TableHead>
						<TableHeadCell class="text-xs">Accuracy</TableHeadCell>
						<TableHeadCell class="text-xs"
							>Results {'(' + permutationResults.getResultCount() + ' Total)'}</TableHeadCell
						>
						<TableHeadCell class="text-xs">Alphabet</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each permutationResults.getResults() as result, i}
							<TableBodyRow>
								<TableBodyCell
									><span class="text-xs"
										>{parseFloat((permutationResults.getAccuracy()[i] * 100).toFixed(2))}%</span
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
									><span class="font-mono text-xs"
										>{DEFAULT_ALPHABET.toString().replaceAll(',', '')}</span
									><br />
									<span class="font-mono text-xs">
										{permutationResults.getAlphabets()[i].toString().replaceAll(',', '')}
									</span>
								</TableBodyCell>
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
