<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
  
	// Create a writable store to hold WebSocket messages
	const messages = writable<string[]>([]);
  
	let socket: WebSocket;
  
	onMount(() => {
	  socket = new WebSocket('ws://localhost:8082');
	  socket.addEventListener('open', () => {
		console.log('Opened WebSocket');
	  });
  
	  socket.addEventListener('message', event => {
		const message: string = event.data;
		console.log("Received message:", message);
		//only shows 3 messages at a time
		messages.update(prevMessages => [...prevMessages.slice(-2), message]);
	  });
	});
  </script>
  
  <h1>Smart Home App</h1>
  <ul>
	{#each $messages as message}
	  <li>{message}</li>
	{/each}
  </ul>
  