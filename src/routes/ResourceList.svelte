<script lang="ts">
  import { addResource, removeResource } from "$lib/utils"
  import { resources } from "./store"

  let inputName: string = '';

  function handleCreateResource() {
    $resources = addResource($resources, {
      id: crypto.randomUUID(),
      name: inputName,
      amount: 0
    });
  }

  function handleDeleteResource(id: string) {
    $resources = removeResource($resources, id);
  }
</script>

<h2>Resource List</h2>
<input type="text" bind:value={inputName} placeholder="Resource Name" />
<button on:click={handleCreateResource}>Create Resource</button>
<ul>
  {#each $resources as resource}
    <li>
      <button on:click={() => handleDeleteResource(resource.id)}>Delete</button>
      {resource.name}:{resource.amount}
    </li>
  {/each}
</ul>