<script lang="ts">
	import {
		Button,
		ButtonGroup,
		GradientButton,
		Heading,
		Input,
		Listgroup,
		ListgroupItem,
		P,
		Range,
		Textarea,
		Tooltip
	} from 'flowbite-svelte';
	import VerticalStackButton from '$lib/components/VerticalStackButton.svelte';
	import VerticalInput from '$lib/components/VerticalInput.svelte';
	import { DEFAULT_ALPHABET } from '$lib/scripts/caesar';

	/** This stores the permutated alphabet. */
	let premutationAlphabet = DEFAULT_ALPHABET.map((l) => l);

	/** Stores the text the user gives us. */
	let inputText = '';

	/** Stores the text we give back to the user. */
	let outputText = '';

	/** A boolean to represent whether we are currently in encryption mode.  If false, we are in decryption mode. */
	let encryptionMode = true;
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Permutation Cipher</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		A permutation cipher is a twist on the classic Caesar cipher. Instead of translating between two
		alphabets with one shifted from the other, your second alphabet is randomly arranged. This
		increases the number of possible alphabets from 26 to 403291461100000000000000000, or roughly
		four hundred and three septillion. A circle that many meters wide is comparable to the size of
		the observable universe.
	</P>
	<div class="flex flex-col justify-center">
		<div class="flex flex-row justify-center">
			<div class="ml-3 flex min-w-[25%] flex-col">
				<Textarea
					placeholder="Input text"
					rows="4"
					bind:value={inputText}
					on:change={() => {
						inputText = inputText.toUpperCase();
					}}
				></Textarea>
				<GradientButton
					outline
					color="greenToBlue"
					class="mt-3"
					on:click={() => {
						encryptionMode = !encryptionMode;
					}}
					>Manual {encryptionMode ? 'Encryption' : 'Decryption'}
				</GradientButton>
				<Tooltip>Click to change to {!encryptionMode ? 'Encryption' : 'Decryption'}.</Tooltip>
				<GradientButton color="greenToBlue" class="mt-1.5">Run</GradientButton>
				<Textarea placeholder="Output text" rows="4" class="mt-3" disabled bind:value={outputText}
				></Textarea>
			</div>
		</div>
	</div>
</div>

<style>
</style>
