<script lang="ts">
  import { addResource, removeResource, findResource } from "$lib/utils"
  import { resources, recipes } from "./store"

  export let recipe: Recipe;
  export let type: string;
  let selectedResource: string = '';
  let inputAmount: number = 0;

  // Add the resource to the recipe
  function handleAddResource(resourceId: string, amount: number) {
    let resource = findResource($resources, resourceId);
    if (!resource) return;

    let newResource = {
      id: resource.id,
      name: resource.name,
      amount: amount
    };

    if (type === "Consumed") {
      recipe.consumedResources = addResource(recipe.consumedResources, newResource);
    } else if (type === "Produced") {
      recipe.producedResources = addResource(recipe.producedResources, newResource);
    }
    $recipes = $recipes;
  }

  // Delete the resource from the recipe
  function handleDeleteResource(resourceId: string) {
    if (type === "Consumed") {
      recipe.consumedResources = removeResource(recipe.consumedResources, resourceId);
    } else if (type === "Produced") {
      recipe.producedResources = removeResource(recipe.producedResources, resourceId);
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
  <button on:click={() => handleAddResource(selectedResource, inputAmount)}>Add</button>
</p>
<ul>
  {#if type === "Consumed"} 
    {#each recipe.consumedResources as resource}
    <li>
      <button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
      {resource.name}: {resource.amount}
    </li>
    {/each}
  {:else if type === "Produced"}
    {#each recipe.producedResources as resource}
    <li>
      <button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
      {resource.name}: {resource.amount}
    </li>
    {/each}
  {/if}
</ul>