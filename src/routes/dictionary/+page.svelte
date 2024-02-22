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
	});

	async function resetWordlist() {
		wordlist.set(await getBasicWordList());
		resyncDisplayWithSession();
	}

	/** This stores the wordlist as \n seperated for display to the user. */
	$: displayWordList = '';

	/** This stores the number of rows currently set for our display text area. */
	$: rows = calculateTextAreaRows(displayWordList);
	/** Determines the visually optimal number of rows for our display text area. */
	function calculateTextAreaRows(wordlist: string){
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
	}

	function updateStoredWordlist() {
		displayWordList = displayWordList.trim();
		wordlist.set('');
		displayWordList.split('\n').forEach((e) => {
			if (e.trim() != '') {
				wordlist.set($wordlist.toString() + e + ',');
			}
		});
		wordlist.set($wordlist.toString().substring(0,$wordlist.toString().length-2));
		resyncDisplayWithSession();
	}
</script>

<title>Dictionary</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Dictionary</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page allows you to customize the default wordlist we use or replace it with your own.
	</P>
	<div class="flex flex-row justify-center">
		<Textarea
			id="wordlist"
			name="wordlist"
			label="Your message"
			placeholder="The Wordlist"
			bind:rows={rows}
			class="h-5/6 max-w-64"
			bind:value={displayWordList}
			style="resize:none"
		/>
		<div class="flex max-h-72 flex-col">
			<Fileupload {...fileuploadprops} class="mb-3 ml-3 max-h-10 max-w-64" />
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
