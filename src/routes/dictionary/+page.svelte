<script lang="ts">
	import { Heading, P, Button, Fileupload, Textarea } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let fileuploadprops = {
		id: 'user_avatar'
	};

	let wordlistprops = {
		id: 'worldlist',
		name: 'wordlist',
		label: 'Your message',
		rows: 40,
		placeholder: 'The Wordlist'
	};

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
		displayWordList = "";
		$wordlist
			.toString()
			.split(',')
			.forEach((e) => {
				displayWordList = displayWordList + e + '\n';
			});
	});

	/** This stores the wordlist as \n seperated for display to the user. */
	$: displayWordList = '';

	function updateStoredWordlist() {
		displayWordList = displayWordList.trim();
		wordlist.set(displayWordList.replaceAll("\n",","));
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
			{...wordlistprops}
			class="max-w-64"
			bind:value={displayWordList}
			style="resize:none"
		/>
		<div class="flex max-h-72 flex-col">
			<Fileupload {...fileuploadprops} class="mb-3 ml-3 max-h-10 max-w-64" />
			<Button outline color="green" class="ml-3 max-w-64" on:click={updateStoredWordlist}>Save Changes</Button>
		</div>
	</div>
</div>

<style>
</style>
