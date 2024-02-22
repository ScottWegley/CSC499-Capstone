<script lang="ts">
	import { Heading, P, Button, Fileupload, Textarea } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let fileuploadprops = {
		id: 'user_avatar'
	};

	let inputFileUpload: HTMLElement;

	/** This variable will store our wordlist.  If one exists in storage, use that.  If not, default to our basic word list. */
	export const wordlist = writable(browser && (localStorage.getItem('wordlist') || 'empty'));
	/** When wordlist changes, update the session storage representation. */
	wordlist.subscribe((val) => browser && localStorage.setItem('wordlist', val.toString()));

	/** This function loads the basic word list we provide from our text file. */
	async function getBasicWordList() {
		console.log('Fetching Basic Word List');
		let response = await fetch('dictionary.txt');
		return (await response.text()).split('\n').toString();
	}

	/** When the page has loaded, unless a different word list exists in memory, grab our default word list and load it. */
	onMount(async () => {
		if (localStorage.getItem('wordlist') == 'empty') {
			wordlist.set(await getBasicWordList());
		}
		resyncDisplayWithSession();
		inputFileUpload = document.getElementsByName('fileUpload')[0];
	});

	/** Load the default wordlist we provide into storage and display. */
	async function resetWordlist() {
		wordlist.set(await getBasicWordList());
		console.log($wordlist.toString());
		resyncDisplayWithSession();
		(inputFileUpload as HTMLInputElement).value = '';
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
			if (newlineCount > window.innerHeight / 26) {
				newlineCount = window.innerHeight / 26;
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
		displayWordList = displayWordList.substring(0, displayWordList.length - 1);
	}

	/** Go through the displayed wordlist, fix any obvious issues, store the wordlist in session storage.*/
	function updateStoredWordlist() {
		displayWordList = displayWordList.trim();
		if (!validDictionary(displayWordList)) {
			return;
		}
		wordlist.set('');
		displayWordList.split('\n').forEach((e) => {
			if (e.trim() != '') {
				wordlist.set($wordlist.toString() + e + ',');
			}
		});
		wordlist.set($wordlist.toString().substring(0, $wordlist.toString().length - 1));
		console.log($wordlist.toString());
		resyncDisplayWithSession();
	}

	/** Storage of an inputted dictionary as a split array. */
	let inputWordArr: string[] = [];

	/** File upload handler.  Restricts upload to plain text and runs validity checks.*/
	async function handleFileUpload(e: Event) {
		let file = (e.target as HTMLInputElement).files![0];
		if (file.type != 'text/plain') {
			alert('Submitted dictionary must be a plaintext file.');
			(e.target as HTMLInputElement).value = '';
			return;
		}
		let inputText = await file.text();
		if (validDictionary(inputText)) {
			displayWordList = '';
			inputWordArr.forEach((word) => {
				displayWordList = displayWordList + word + '\n';
			});
			displayWordList.trim();
			updateStoredWordlist();
		} else {
			(e.target as HTMLInputElement).value = '';
		}
	}

	/** Function to assess if specified text is valid dictionary.  Stores results in inputWordArr if so.*/
	function validDictionary(dictionary: string): boolean {
		dictionary = dictionary.trim().toLowerCase();
		dictionary = dictionary.replaceAll(',', '\n');
		let invalidCharacters = '0123456789`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?';

		for (let i = 0; i < invalidCharacters.length; i++) {
			if (dictionary.indexOf(invalidCharacters.charAt(i)) != -1) {
				alert(
					`Dictionary contained invalid character: ${invalidCharacters.charAt(i)} on Line ${i + 1}`
				);
				return false;
			}
		}

		inputWordArr = [];

		let dictionaryArray = dictionary.split('\n');
		for (let i = 0; i < dictionaryArray.length; i++) {
			dictionaryArray[i] = dictionaryArray[i].trim();
			if (dictionaryArray[i].indexOf(' ') != -1) {
				alert(`Cannot have spaces in dictionary entries.  Line ${i + 1}`);
				return false;
			}
			if (!(dictionaryArray[i].length == 0)) {
				inputWordArr.push(dictionaryArray[i]);
			}
		}
		return true;
	}
</script>

<title>Dictionary</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Dictionary</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page allows you to customize the default wordlist we use or replace it with your own.
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
		/>
		<div class="flex flex-col">
			<Fileupload
				{...fileuploadprops}
				class="mb-3 ml-3 max-h-10 max-w-64"
				accept=".txt"
				name="fileUpload"
				on:change={handleFileUpload}
			/>
			<Button outline color="green" class="mb-1 ml-3 max-w-64" on:click={updateStoredWordlist}
				>Save Changes</Button
			>
			<Button outline color="red" class="ml-3 max-w-64" on:click={resetWordlist}
				>Reset to Default</Button
			>
		</div>
	</div>
</div>

<style>
</style>
