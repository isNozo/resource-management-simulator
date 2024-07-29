<script lang="ts">
  import { onMount } from 'svelte';
  import ResourceList from './ResourceList.svelte';
  import RecipeList from './RecipeList.svelte';

  let resources: Resource[] = [];
  let recipes: Recipe[] = [];

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
</script>

<button on:click={() => { localStorage.clear(); recipes = []; resources = []; }}>Clear Local Storage</button>
<ResourceList bind:resources />
<RecipeList bind:recipes bind:resources />