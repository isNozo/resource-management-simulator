<script lang="ts">
	import ResourceList from './ResourceList.svelte';
	import RecipeList from './RecipeList.svelte';
	import Simulation from './Simulation.svelte';
	import Analyze from './Analyze.svelte';
	import Flow from './Flow.svelte';
	import { resources, recipes } from './store';
</script>

<button
	on:click={() => {
		localStorage.clear();
		$resources = [];
		$recipes = [];
	}}>Clear Local Storage</button
>
<Simulation />
<Analyze />
<ResourceList />
<RecipeList />
<Flow />