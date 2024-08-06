<script lang="ts">
	import { findRecipe, isRecipeApplicable, applyRecipe } from '$lib/utils';
	import { resources, recipes } from './store';
	let selectedRecipe: string = '';

	function simulate(recipeID: string) {
		let recipe = findRecipe($recipes, recipeID);
		if (!recipe || !isRecipeApplicable($resources, recipe)) return;

		$resources = applyRecipe($resources, recipe);
	}
</script>

<h2>Simulation</h2>
<select bind:value={selectedRecipe}>
	{#each $recipes as recipe}
		<option value={recipe.id}>{recipe.name}</option>
	{/each}
</select>
<button on:click={() => simulate(selectedRecipe)}>Simulate</button>
