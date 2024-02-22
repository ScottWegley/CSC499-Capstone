<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Caesar Cipher</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48" align="center">
		The Caesar Cipher is one of the oldest and most famous substitution ciphers.  It works very simply, only requiring knowledge
        of the order of the alphabet.  For example, the word "Barnacle" becomes "Cbsobdmf" after a 1-Right Shift.  Every letter becomes
        the letter one to the right in the alphabet.  It becomes "Azqmzbkd" after a 1-Left Shift.  Notice that time that the letter A 
        became the letter Z.  If a shift pushes a letter before the beginning or after the end of the alphabet you simply wrap around
        to the other side.
	</P>
</div>

<style>
</style>
