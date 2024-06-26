<script lang="ts">
	import { Alert, Button, GradientButton, Heading, P, Textarea, Tooltip } from 'flowbite-svelte';
	import VerticalStackButton from '$lib/components/VerticalStackButton.svelte';
	import VerticalInput from '$lib/components/VerticalInput.svelte';
	import {
		generateRandomAlphabet,
		isValidAlphabet,
		permutationDecrypt,
		permutationEncrypt
	} from '$lib/scripts/Ciphers/PermutationCipher';
	import { DEFAULT_ALPHABET, sanitizeInput } from '$lib/scripts/Util/Dictionary';

	/** This stores the permutated alphabet. */
	let permutationAlphabet = DEFAULT_ALPHABET.map((l) => l);

	/** Stores the text the user gives us. */
	let inputText = '';

	/** Stores the text we give back to the user. */
	let outputText = '';

	/** A boolean to represent whether we are currently in encryption mode.  If false, we are in decryption mode. */
	let encryptionMode = true;

	/** Function to en/decrypt the input based on the encryption mode. */
	function performOperation() {
		inputText = inputText.toUpperCase();
		outputText = encryptionMode
			? permutationEncrypt(inputText, permutationAlphabet)
			: permutationDecrypt(inputText, permutationAlphabet);
	}
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Permutation Cipher</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		A permutation cipher is a twist on the classic Caesar cipher. Instead of translating between two
		alphabets with one shifted, your second alphabet is randomly arranged. This increases the number
		of possible alphabets from 26 to 4.032914611*10<sup>26</sup>, or roughly four hundred and three
		septillion. A circle that many meters wide is comparable to the size of the observable universe.
		To use a specific alphabet instead of a random one, just click into any letter of the blue
		alphabet and edit it.
	</P>
	<div class="flex flex-row justify-center">
		<!-- #region Alphabet Generation and Display -->
		<div class="flex flex-col">
			<Button
				class="mb-1.5 w-20 text-xs"
				on:click={() => {
					permutationAlphabet = generateRandomAlphabet();
				}}>Randomize</Button
			>
			<div class="flex flex-row justify-center">
				<div class="mb-1.5 mr-1 flex h-min min-w-fit flex-col rounded-lg shadow-sm">
					{#each DEFAULT_ALPHABET as letter}
						<VerticalStackButton size="xs" outline color="green" class="h-min"
							>{letter}</VerticalStackButton
						>
					{/each}
				</div>
				<div class="mb-1.5 mr-1 flex h-min min-w-fit flex-col rounded-lg shadow-sm">
					{#each permutationAlphabet as letter, i}
						<VerticalInput
							class="h-min w-9 max-w-9 text-center"
							size="sm"
							color="blue"
							bind:value={permutationAlphabet[i]}
							on:change={() => {
								permutationAlphabet[i] = permutationAlphabet[i]
									.trim()
									.toUpperCase()
									.substring(0, 1);
							}}
						></VerticalInput>
					{/each}
				</div>
			</div>
		</div>
		<!-- #endregion -->
		<!-- #region User Input & Interaction -->
		<div class="ml-3 flex w-[25%] flex-col">
			<Textarea
				placeholder="Input text"
				rows="4"
				bind:value={inputText}
				class="resize-none"
				on:change={() => {
					inputText = sanitizeInput(inputText);
				}}
			></Textarea>
			<GradientButton
				outline
				color="greenToBlue"
				class="mt-3"
				on:click={() => {
					encryptionMode = !encryptionMode;
					isValidAlphabet(permutationAlphabet);
				}}
				>Manual {encryptionMode ? 'Encryption' : 'Decryption'}
			</GradientButton>
			<Tooltip>Click to change to {!encryptionMode ? 'Encryption' : 'Decryption'}.</Tooltip>
			<GradientButton
				color="greenToBlue"
				class="mt-1.5"
				disabled={!isValidAlphabet(permutationAlphabet)}
				on:click={performOperation}>Run</GradientButton
			>
			<Textarea
				placeholder="Output text"
				rows="4"
				class="mt-3 resize-none"
				disabled
				bind:value={outputText}
			></Textarea>
			{#if !isValidAlphabet(permutationAlphabet)}
				<Alert color="none" class="mt-3 border-t-4 border-red-900 bg-[#111827] text-white"
					>Something is wrong with your blue alphabet! Make sure you only have one of each letter.</Alert
				>
			{/if}
		</div>
		<!-- #endregion -->
	</div>
</div>

<style>
</style>
