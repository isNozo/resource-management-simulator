<script lang="ts">
  import { resources } from "./store"

  let inputNameResource: string = '';

  // Save the resource with the text input to local storage
  function handleSaveResource() {
    $resources.push({
      id: crypto.randomUUID(),
      name: inputNameResource,
      amount: 0
    });
    $resources = $resources;
  }

  // Delete the resource
  function handleDeleteResource(id: string) {
    $resources = $resources.filter(($resource) => $resource.id !== id);
    $resources = $resources;
  }
</script>

<h2>Resource List</h2>
<input type="text" bind:value={inputNameResource} placeholder="Resource Name" />
<button on:click={handleSaveResource}>Create Resource</button>
<ul>
  {#each $resources as resource}
    <li>
      <button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
      {resource.id}: {resource.name}
    </li>
  {/each}
</ul>