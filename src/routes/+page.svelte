<script lang="ts">
  import { onMount } from 'svelte';
  import ResourceList from './ResourceList.svelte';
  import RecipeList from './RecipeList.svelte';
  import { resources, recipes } from './store';
</script>

<button on:click={() => { localStorage.clear(); $resources = []; $recipes = []; }}>Clear Local Storage</button>
<ResourceList/>
<RecipeList/>
