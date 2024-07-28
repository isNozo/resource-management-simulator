<script lang="ts">
  import { onMount } from 'svelte';

  type Resource = {
    id: string;
    name: string;
  };
  let resources: Resource[] = [];

  type Recipe = {
    id: string;
    name: string;
    consumedResources: Resource[];
    producedResources: Resource[];
  };
  let recipes: Recipe[] = [];

  let inputNameResource: string = '';
  let inputNameRecipe: string = '';

  // Retrieve data from local storage when the page loads
  onMount(() => {
    const savedResources = localStorage.getItem('savedResources');
    if (savedResources) {
      resources = JSON.parse(savedResources);
    }
    const savedRecipes = localStorage.getItem('savedRecipes');
    if (savedRecipes) {
      recipes = JSON.parse(savedRecipes);
    }
  });

  // Save the resource with the text input to local storage
  function handleSaveResource() {
    resources.push({
      id: crypto.randomUUID(),
      name: inputNameResource,
    });
    resources = resources;
    // Save the data to local storage
    localStorage.setItem('savedResources', JSON.stringify(resources));
  }

  let selectedConsumedResource: string = '';
  let selectedProducedResource: string = '';
  
  // Save the recipe with the text input to local storage
  function handleSaveRecipe() {
    const consumedResource = resources.find(r => r.id === selectedConsumedResource);
    const producedResource = resources.find(r => r.id === selectedProducedResource);
    if (!consumedResource || !producedResource) {
      return;
    }
    recipes.push({
      id: crypto.randomUUID(),
      name: inputNameRecipe,
      consumedResources: [consumedResource],
      producedResources: [producedResource],
    });
    recipes = recipes;
    localStorage.setItem('savedRecipes', JSON.stringify(recipes));
  }

  // Delete the resource
  function handleDeleteResource(id: string) {
    resources = resources.filter((resource) => resource.id !== id);
    resources = resources;
    localStorage.setItem('savedResources', JSON.stringify(resources));
  }

  // Delete the recipe
  function handleDeleteRecipe(id: string) {
    recipes = recipes.filter((recipe) => recipe.id !== id);
    recipes = recipes;
    localStorage.setItem('savedRecipes', JSON.stringify(recipes));
  }
</script>

<button on:click={() => { localStorage.clear(); recipes = []; resources = []; }}>Clear Local Storage</button>

<h2>Resource List</h2>
<input type="text" bind:value={inputNameResource} placeholder="Resource Name" />
<button on:click={handleSaveResource}>Create Resource</button>
<ul>
  {#each resources as resource}
    <li>
      <button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
      {resource.id}: {resource.name}
    </li>
  {/each}
</ul>

<h2>Recipe List</h2>
<input type="text" bind:value={inputNameRecipe} placeholder="Recipe Name" />
<label for="consumedResource">ConsumedResource:</label>
<select id="consumedResource" bind:value={selectedConsumedResource}>
  <option value="">select</option>
  {#each resources as resource}
    <option value={resource.id}>{resource.name}</option>
  {/each}
</select>
<label for="producedResource">ProducedResource:</label>
<select id="producedResource" bind:value={selectedProducedResource}>
  <option value="">select</option>
  {#each resources as resource}
    <option value={resource.id}>{resource.name}</option>
  {/each}
</select>
<button on:click={handleSaveRecipe}>Create Recipe</button>
<ul>
  {#each recipes as recipe}
    <li>
      <button on:click={() => handleDeleteRecipe(recipe.id)}>Delete</button>
      {recipe.id}: {recipe.name}
      <p>Consumed Resources: {#each recipe.consumedResources as resource}{resource.name}{/each}</p>
      <p>Produced Resources: {#each recipe.producedResources as resource}{resource.name}{/each}</p>
    </li>
  {/each}
</ul>
