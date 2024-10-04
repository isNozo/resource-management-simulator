<script lang="ts">
	import { addAction, removeAction } from '$lib/utils';
	import { actions } from './store';
	import ActionList_ResourceEdit from './ActionList_ResourceEdit.svelte';

	let inputName: string = '';

	function handleCreateAction() {
		$actions = addAction($actions, {
			id: crypto.randomUUID(),
			name: inputName,
			consumedResources: [],
			producedResources: []
		});
	}

	function handleDeleteAction(id: string) {
		$actions = removeAction($actions, id);
	}
</script>

<h2>Action List</h2>
<input type="text" bind:value={inputName} placeholder="Action Name" />
<button on:click={handleCreateAction}>Create Action</button>
<ul>
	{#each $actions as action}
		<li>
			<button on:click={() => handleDeleteAction(action.id)}>Delete</button>
			{action.name}
			<ActionList_ResourceEdit {action} type="Consumed" />
			<ActionList_ResourceEdit {action} type="Produced" />
		</li>
	{/each}
</ul>
