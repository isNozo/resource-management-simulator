<script lang="ts">
  import { resources, recipes } from "./store"

  export let recipe: Recipe;
  export let type: string;
  let selectedResource: string = '';
  let inputAmount: number = 0;

  // Add the resource to the recipe
  function handleAddResource(recipeId: string, resourceId: string, amount: number) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      let resource = $resources.find((resource) => resource.id === resourceId);
      if (resource) {
        if (type === "Consumed") {
          recipe.consumedResources.push({
            id: resource.id,
            name: resource.name,
            amount: amount
          });
        } else if (type === "Produced") {
          recipe.producedResources.push({
            id: resource.id,
            name: resource.name,
            amount: amount
          });
        }
      }
    }
    $recipes = $recipes;
  }

  // Delete the resource from the recipe
  function handleDeleteResource(recipeId: string, resourceId: string) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      if (type === "Consumed") {
        recipe.consumedResources = recipe.consumedResources.filter(($resource) => $resource.id !== resourceId);
      } else if (type === "Produced") {
        recipe.producedResources = recipe.producedResources.filter(($resource) => $resource.id !== resourceId);
      }
    }
    $recipes = $recipes;
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
  <button on:click={() => handleAddResource(recipe.id, selectedResource, inputAmount)}>Add</button>
</p>
<ul>
  {#if type === "Consumed"} 
    {#each recipe.consumedResources as resource}
    <li>
      <button on:click={() => handleDeleteResource(recipe.id, resource.id)}>Delete</button>
      {resource.name}: {resource.amount}
    </li>
    {/each}
  {:else if type === "Produced"}
    {#each recipe.producedResources as resource}
    <li>
      <button on:click={() => handleDeleteResource(recipe.id, resource.id)}>Delete</button>
      {resource.name}: {resource.amount}
    </li>
    {/each}
  {/if}
</ul>