<script lang="ts">
	import { addResource, removeResource, findResource } from '$lib/utils';
	import { resources, actions } from './store';

	export let action: Action;
	export let type: string;
	let selectedResource: string = '';
	let inputAmount: number = 0;

	// Add the resource to the action
	function handleAddResource(resourceId: string, amount: number) {
		let resource = findResource($resources, resourceId);
		if (!resource) return;

		let newResource = {
			id: resource.id,
			name: resource.name,
			amount: amount
		};

		if (type === 'Consumed') {
			action.consumedResources = addResource(action.consumedResources, newResource);
		} else if (type === 'Produced') {
			action.producedResources = addResource(action.producedResources, newResource);
		}
		$actions = $actions;
	}

	// Delete the resource from the action
	function handleDeleteResource(resourceId: string) {
		if (type === 'Consumed') {
			action.consumedResources = removeResource(action.consumedResources, resourceId);
		} else if (type === 'Produced') {
			action.producedResources = removeResource(action.producedResources, resourceId);
		}
		$actions = $actions;
	}
</script>

<p>
	{type} Resources:
	<select bind:value={selectedResource}>
		<option value="">select</option>
		{#each $resources as resource}
			<option value={resource.id}>{resource.name}</option>
		{/each}
	</select>
	<input type="number" bind:value={inputAmount} placeholder="Amount" />
	<button on:click={() => handleAddResource(selectedResource, inputAmount)}>Add</button>
</p>
<ul>
	{#if type === 'Consumed'}
		{#each action.consumedResources as resource}
			<li>
				<button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
				{resource.name}: {resource.amount}
			</li>
		{/each}
	{:else if type === 'Produced'}
		{#each action.producedResources as resource}
			<li>
				<button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
				{resource.name}: {resource.amount}
			</li>
		{/each}
	{/if}
</ul>
