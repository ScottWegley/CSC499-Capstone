<script lang="ts">
	import { Heading, P, Button, Fileupload, Textarea } from 'flowbite-svelte';

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
</script>

<title>Dictionary</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Dictionary</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
		This page allows you to customize the default wordlist we use or replace it with your own.
	</P>
	<div class="flex flex-row justify-center">
		<Textarea {...wordlistprops} class="max-w-64" />
		<div class="flex flex-col max-h-72">
			<Fileupload {...fileuploadprops} class="ml-3 max-h-10 max-w-64 mb-3" />
			<Button outline color="green" class="max-w-64 ml-3">Save Changes</Button>
		</div>
	</div>
</div>

<style>
</style>
