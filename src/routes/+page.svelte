<script lang="ts">
	import ResourceList from './ResourceList.svelte';
	import ActionList from './ActionList.svelte';
	import Simulation from './Simulation.svelte';
	import Analyze from './Analyze.svelte';
	import Flow from './Flow.svelte';
	import { resources, actions } from './store';
</script>

<button
	on:click={() => {
		localStorage.clear();
		$resources = [];
		$actions = [];
	}}>Clear Local Storage</button
>
<Simulation />
<Analyze />
<ResourceList />
<ActionList />
<Flow />