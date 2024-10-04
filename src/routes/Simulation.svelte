<script lang="ts">
	import { findAction, isActionApplicable, applyAction } from '$lib/utils';
	import { resources, actions } from './store';
	let selectedAction: string = '';

	function simulate(actionID: string) {
		let action = findAction($actions, actionID);
		if (!action) return;

		let newResources = applyAction($resources, action);
		if (!newResources) return;
		
		$resources = newResources;
	}
</script>

<h2>Simulation</h2>
<select bind:value={selectedAction}>
	{#each $actions as action}
		<option value={action.id}>{action.name}</option>
	{/each}
</select>
<button on:click={() => simulate(selectedAction)}>Simulate</button>
