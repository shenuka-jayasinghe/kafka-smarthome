<script lang="ts">
	import Graph from '$lib/Graph.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Create a writable store to hold WebSocket messages
	const messages = writable<string[]>([]);
	const temps = writable<number[]>([]);
	const times = writable<number[]>([]);

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
			const timeString = parsedMessage.time
			times.update((prevtimes) => [...prevtimes.slice(-5), timeString])
			temps.update((prevTemps) => [...prevTemps.slice(-5), tempNumber]);
		});
	});
</script>


<div class="container mx-auto my-auto p-4">
	<div class="card p-4 flex flex-wrap bg-gray-800" id="heating">
		<Graph tempData={$temps} 
	times={$times}
	/>
	</div>
</div>


<style>
#heating {
	background-color: #1F2937;
}
</style>