<script lang="ts">
	import Graph from '$lib/Graph.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Create a writable store to hold WebSocket messages
	const messages = writable<string[]>([]);
	const temps = writable<number[]>([]);

	let socket: WebSocket;

	onMount(() => {
		socket = new WebSocket('ws://localhost:8082');
		socket.addEventListener('open', () => {
			console.log('Opened WebSocket');
		});

		socket.addEventListener('message', (event) => {
			const message: string = event.data;
			// console.log('Received message:', message);
			//only shows 3 messages at a time
			messages.update((prevMessages) => [...prevMessages.slice(-2), message]);
			const parsedMessage = JSON.parse(message);
			const tempString = parsedMessage.temp
			const tempNumber = parseFloat(tempString.match(/[\d.]+/g).join(''));
			temps.update((prevTemps) => [...prevTemps.slice(-9), tempNumber]);
		});
	});
</script>

<h1>Smart Home App</h1>

<Graph tempData={$temps} />

