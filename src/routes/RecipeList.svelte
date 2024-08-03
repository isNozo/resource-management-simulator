<script lang="ts">
  import { resources, recipes } from "./store"

  let inputNameRecipe: string = '';
  let selectedConsumedResource: string = '';
  let selectedProducedResource: string = '';
  
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

  // Add the consumed resource
  function handleAddConsumedResource(recipeId: string, resourceId: string) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      let resource = $resources.find((resource) => resource.id === resourceId);
      if (resource) {
        recipe.consumedResources.push(resource);
      }
    }
    $recipes = $recipes;
  }

  // Delete the consumed resource
  function handleDeleteConsumedResource(recipeId: string, resourceId: string) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      recipe.consumedResources = recipe.consumedResources.filter(($resource) => $resource.id !== resourceId);
    }
    $recipes = $recipes;
  }

  // Add the produced resource
  function handleAddProducedResource(recipeId: string, resourceId: string) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      let resource = $resources.find((resource) => resource.id === resourceId);
      if (resource) {
        recipe.producedResources.push(resource);
      }
    }
    $recipes = $recipes;
  }

  // Delete the produced resource
  function handleDeleteProducedResource(recipeId: string, resourceId: string) {
    let recipe = $recipes.find((recipe) => recipe.id === recipeId);
    if (recipe) {
      recipe.producedResources = recipe.producedResources.filter(($resource) => $resource.id !== resourceId);
    }
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

      <p>
        Consumed Resources:
        <select bind:value={selectedConsumedResource}>
          <option value="">select</option>
          {#each $resources as resource}
            <option value={resource.id}>{resource.name}</option>
          {/each}
        </select>
        <button on:click={() => handleAddConsumedResource(recipe.id, selectedConsumedResource)}>Add</button>
      </p>
      <ul>
        {#each recipe.consumedResources as resource}
          <li>
            <button on:click={() => handleDeleteConsumedResource(recipe.id, resource.id)}>Delete</button>
            {resource.name}
          </li>
        {/each}
      </ul>

      <p>
        Produced Resources:
        <select bind:value={selectedProducedResource}>
          <option value="">select</option>
          {#each $resources as resource}
            <option value={resource.id}>{resource.name}</option>
          {/each}
        </select>
        <button on:click={() => handleAddProducedResource(recipe.id, selectedProducedResource)}>Add</button>
      </p>
      <ul>
        {#each recipe.producedResources as resource}
          <li>
            <button on:click={() => handleDeleteProducedResource(recipe.id, resource.id)}>Delete</button>
            {resource.name}
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
