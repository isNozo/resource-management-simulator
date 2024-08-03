<script lang="ts">
  import { resources, recipes } from "./store"
  import Resource_in_Recipe from "./Resource_in_Recipe.svelte"

  let inputNameRecipe: string = '';
  
  // Save the recipe with the text input to local storage
  function handleSaveRecipe() {
    $recipes.push({
      id: crypto.randomUUID(),
      name: inputNameRecipe,
      consumedResources: [],
      producedResources: [],
    });
    $recipes = $recipes;
  }

  // Delete the recipe
  function handleDeleteRecipe(id: string) {
    $recipes = $recipes.filter(($recipe) => $recipe.id !== id);
    $recipes = $recipes;
  }
</script>

<h2>Recipe List</h2>
<input type="text" bind:value={inputNameRecipe} placeholder="Recipe Name" />
<button on:click={handleSaveRecipe}>Create Recipe</button>
<ul>
  {#each $recipes as recipe}
    <li>
      <button on:click={() => handleDeleteRecipe(recipe.id)}>Delete</button>
      {recipe.id}: {recipe.name}
      <Resource_in_Recipe {recipe} type="Consumed" />
      <Resource_in_Recipe {recipe} type="Produced" />
    </li>
  {/each}
</ul>
