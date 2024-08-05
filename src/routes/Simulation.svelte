<script lang="ts">
  import { findRecipe } from "$lib/utils"
  import { resources, recipes } from './store';
  let selectedRecipe: string = '';

  function simulate(recipeID: string) {
    let newResources = $resources;
    
    let recipe = findRecipe($recipes, recipeID);
    if (!recipe) return;

    newResources = newResources.map((resource) => {
      for (let consumedResource of recipe.consumedResources) {
        if (resource.id === consumedResource.id) {
          resource.amount -= consumedResource.amount;
        }
      }
      for (let producedResource of recipe.producedResources) {
        if (resource.id === producedResource.id) {
          resource.amount += producedResource.amount;
        }
      }
      return resource;
    });
    
    $resources = newResources;
  }
</script>

<h2>Simulation</h2>
<select bind:value={selectedRecipe}>
  {#each $recipes as recipe}
    <option value={recipe.id}>{recipe.name}</option>
  {/each}
</select>
<button on:click={() => simulate(selectedRecipe)}>Simulate</button>