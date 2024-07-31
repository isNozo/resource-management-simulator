<script lang="ts">
  import { resources, recipes } from "./store"

  let inputNameRecipe: string = '';
  let selectedConsumedResource: string = '';
  let selectedProducedResource: string = '';
  
  // Save the recipe with the text input to local storage
  function handleSaveRecipe() {
    const consumedResource = $resources.find(r => r.id === selectedConsumedResource);
    const producedResource = $resources.find(r => r.id === selectedProducedResource);
    if (!consumedResource || !producedResource) {
      return;
    }
    $recipes.push({
      id: crypto.randomUUID(),
      name: inputNameRecipe,
      consumedResources: [consumedResource],
      producedResources: [producedResource],
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
<label for="consumedResource">ConsumedResource:</label>
<select id="consumedResource" bind:value={selectedConsumedResource}>
  <option value="">select</option>
  {#each $resources as resource}
    <option value={resource.id}>{resource.name}</option>
  {/each}
</select>
<label for="producedResource">ProducedResource:</label>
<select id="producedResource" bind:value={selectedProducedResource}>
  <option value="">select</option>
  {#each $resources as resource}
    <option value={resource.id}>{resource.name}</option>
  {/each}
</select>
<button on:click={handleSaveRecipe}>Create Recipe</button>
<ul>
  {#each $recipes as recipe}
    <li>
      <button on:click={() => handleDeleteRecipe(recipe.id)}>Delete</button>
      {recipe.id}: {recipe.name}
      <p>Consumed Resources: {#each recipe.consumedResources as resource}{resource.name}{/each}</p>
      <p>Produced Resources: {#each recipe.producedResources as resource}{resource.name}{/each}</p>
    </li>
  {/each}
</ul>
