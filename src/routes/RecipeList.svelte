<script lang="ts">
	import { addRecipe, removeRecipe } from '$lib/utils';
	import { recipes } from './store';
	import RecipeList_ResourceEdit from './RecipeList_ResourceEdit.svelte';

	let inputName: string = '';

	function handleCreateRecipe() {
		$recipes = addRecipe($recipes, {
			id: crypto.randomUUID(),
			name: inputName,
			consumedResources: [],
			producedResources: []
		});
	}

	function handleDeleteRecipe(id: string) {
		$recipes = removeRecipe($recipes, id);
	}
</script>

<h2>Recipe List</h2>
<input type="text" bind:value={inputName} placeholder="Recipe Name" />
<button on:click={handleCreateRecipe}>Create Recipe</button>
<ul>
	{#each $recipes as recipe}
		<li>
			<button on:click={() => handleDeleteRecipe(recipe.id)}>Delete</button>
			{recipe.name}
			<RecipeList_ResourceEdit {recipe} type="Consumed" />
			<RecipeList_ResourceEdit {recipe} type="Produced" />
		</li>
	{/each}
</ul>
