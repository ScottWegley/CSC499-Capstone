<script lang="ts">
	import {
		Heading,
		P,
		Button,
		Fileupload,
		Textarea,
		Footer,
		Alert,
		Tooltip,
		Modal,
		Kbd
	} from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getSpecificWordlist, isValidDictionary } from '$lib/scripts/Ciphers/Dictionary';

	/** Stores a reference to the fileupload element. */
	let inputFileUpload: HTMLElement;

	/** This variable will store our wordlist.  If one exists in storage, use that.  If not, default to our basic word list. */
	const wordlist = writable(browser && (localStorage.getItem('wordlist') || 'empty'));
	/** When wordlist changes, update the session storage representation. */
	wordlist.subscribe((val) => browser && localStorage.setItem('wordlist', val.toString().toUpperCase()));

	/** When the page has loaded, unless a different word list exists in memory, grab our default word list and load it. */
	onMount(async () => {
		if (localStorage.getItem('wordlist') == 'empty') {
			wordlist.set(await getSpecificWordlist('extrasmall.txt'));
		}
		resyncDisplayWithSession();
		inputFileUpload = document.getElementsByName('fileUpload')[0];
	});

	/** Grab the default 10k wordlist or allow the user to select one. */
	async function resetWordlist(e: Event) {
		if ((e as PointerEvent).shiftKey) {
			dictionarySelectPopUp = true;
		} else {
			resetToAltWordlist('extrasmall.txt');
		}
	}

	/** Dynamically pick a wordlist based on filename. */
	async function resetToAltWordlist(filename: string) {
		wordlist.set(await getSpecificWordlist(filename));
		console.log("Setting dictionary to " + filename);
		resyncDisplayWithSession();
		(inputFileUpload as HTMLInputElement).value = '';
		saveAcknowledged = false;
		unsavedChanges = false;
	}

	/** This stores the wordlist as \n seperated for display to the user. */
	$: displayWordList = '';

	/** This stores the number of rows currently set for our display text area. */
	$: rows = calculateTextAreaRows(displayWordList);

	/** Determines the visually optimal number of rows for our display text area. */
	function calculateTextAreaRows(wordlist: string) {
		if (browser) {
			let newlineCount = wordlist.match(/\n/g)?.length || 0;
			newlineCount += 1.5;
			if (newlineCount > window.innerHeight / 30) {
				newlineCount = window.innerHeight / 30;
			}
			return newlineCount;
		}
	}

	/** Update the display list to match the session memory. */
	function resyncDisplayWithSession() {
		displayWordList = '';
		$wordlist
			.toString()
			.split(',')
			.forEach((e) => {
				displayWordList = displayWordList + e + '\n';
			});
		displayWordList = displayWordList.substring(0, displayWordList.length - 1).toUpperCase();
	}

	/** Go through the displayed wordlist, fix any obvious issues, store the wordlist in session storage.*/
	function updateStoredWordlist() {
		displayWordList = displayWordList.trim();
		if (!isValidDictionary(displayWordList)) {
			return false;
		}
		wordlist.set('');
		displayWordList.split('\n').forEach((e) => {
			if (e.trim() != '') {
				wordlist.set($wordlist.toString() + e.trim() + ',');
			}
		});
		wordlist.set($wordlist.toString().substring(0, $wordlist.toString().length - 1));
		wordlist.set(
			$wordlist.toString().replaceAll('\r', '').replaceAll('\n', '').trim().toUpperCase()
		);
		resyncDisplayWithSession();
		return true;
	}

	/** Storage of an inputted dictionary as a split array. */
	let inputWordArr: string[] = [];

	function storeInWordArray(data: string) {
		inputWordArr.push(data);
	}

	/** File upload handler.  Restricts upload to plain text and runs validity checks.*/
	async function handleFileUpload(e: Event) {
		let file = (e.target as HTMLInputElement).files![0];
		if (file.type != 'text/plain') {
			alert('Submitted dictionary must be a plaintext file.');
			(e.target as HTMLInputElement).value = '';
			return;
		}
		let inputText = await file.text();
		inputWordArr = [];
		if (isValidDictionary(inputText, storeInWordArray)) {
			displayWordList = '';
			inputWordArr.forEach((word) => {
				displayWordList = displayWordList + word + '\n';
			});
			displayWordList.trim();
			updateStoredWordlist();
			saveAcknowledged = false;
			unsavedChanges = false;
		} else {
			(e.target as HTMLInputElement).value = '';
		}
	}

	/** Function to create a text file of our dictionary and allow the user to download it. */
	function downloadDictionary() {
		let link = document.createElement('a');
		let file = new Blob([displayWordList], { type: 'text/plain' });
		link.href = URL.createObjectURL(file);
		link.download = 'dictionary.txt';
		link.click();
		URL.revokeObjectURL(link.href);
	}

	/** Boolean to track whether user has saved changes. */
	let unsavedChanges = false;
	/** Boolean to track whether the user has acknowledged our saving alert. */
	let saveAcknowledged = true;

	/** Boolean to control opening the dictionary selection modal. */
	let dictionarySelectPopUp = false;

	function alertUserToDictionaryChange(e: Event) {
		unsavedChanges = true;
		saveAcknowledged = true;
	}
</script>

<title>Dictionary</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Dictionary</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page allows you to customize the default wordlist we use or replace it with your own. <br/>
		Editing word lists of more than 20,000 words is likely to crash your browser.  For lengthy word lists, edit on your computer and upload the .txt file.
	</P>
	<div class="flex min-h-[75%] flex-row justify-center">
		<Textarea
			id="wordlist"
			name="wordlist"
			label="Your message"
			placeholder="The Wordlist"
			bind:rows
			class="h-5/6 max-w-64"
			bind:value={displayWordList}
			style="resize:none"
			on:change={alertUserToDictionaryChange}
		/>
		<div class="flex flex-col">
			<Fileupload
				class="mb-3 ml-3 max-h-10 max-w-64"
				accept=".txt"
				name="fileUpload"
				on:change={handleFileUpload}
			/>
			<Button
				outline
				color="green"
				class="mb-1 ml-3 max-w-64"
				on:click={() => {
					if (updateStoredWordlist()) {
						unsavedChanges = false;
						saveAcknowledged = false;
					}
				}}>Save Changes</Button
			>
			<Button outline color="red" class="mb-1 ml-3 max-w-64" on:click={resetWordlist}
				>Reset to Default</Button
			>
			<Tooltip
				>We provide a default wordlist composed of Google's 10,000 most common english words. <br />
				To select another from our default lists, press <Kbd class="px-1.5 py-1">shift</Kbd> and click the reset button.
			</Tooltip>
			<Modal size="xs" bind:open={dictionarySelectPopUp} autoclose>
				<div class="flex flex-col text-center">
					<Heading tag="h3" class="mb-5">Please select a dictionary.</Heading>
					<div class="flex flex-row justify-center">
						<Button
							class="mr-3"
							on:click={() => {
								resetToAltWordlist('small.txt');
							}}>Small</Button
						>
						<Tooltip>
							Composed of 20,000 Words.
						</Tooltip>
						<Button
							class=""
							on:click={() => {
								resetToAltWordlist('medium.txt');
							}}>Medium</Button
						>
						<Tooltip>
							Composed of 30,000 Words.
						</Tooltip>
						<Button
							class="ml-3"
							on:click={() => {
								resetToAltWordlist('large.txt');
							}}>Large</Button
						>
						<Tooltip>
							Composed of ~63,000 Words.
						</Tooltip>
					</div>
				</div>
			</Modal>
			<Button outline color="yellow" class="ml-3 max-w-64" on:click={downloadDictionary}>
				Download Dictionary
			</Button>
		</div>
		<div class="max"></div>
	</div>
</div>
<div class="mt-3 flex flex-row justify-center">
	<Footer>
		{#if unsavedChanges}
			<Alert color="red" border class="cursor-default"
				><span class="font-medium">Danger!</span> You have unsaved changes. Click
				<span
					class="cursor-pointer underline"
					on:click={() => {
						unsavedChanges = false;
					}}>here</span
				> to dismiss.</Alert
			>
		{/if}
		{#if !saveAcknowledged}
			<Alert color="green" border class="cursor-default"
				><span class="font-medium">Successfully saved changes!</span> Click
				<span
					class="cursor-pointer underline"
					on:click={() => {
						saveAcknowledged = true;
						unsavedChanges = false;
					}}>here</span
				> to dismiss.</Alert
			>
		{/if}
	</Footer>
</div>

<style>
</style>
