<script lang="ts">
	import { applyAllRecipes } from '$lib/utils';
	import { resources, recipes } from './store';

	$: states = applyAllRecipes($resources, $recipes);
</script>

<h2>Analyze</h2>

<ul>
	{#each states as state}
		<li>
			<h3>{state.id}</h3>
			<p>Resources:</p>
			<ul>
				{#each state.resources as resource}
					<li>{resource.name}: {resource.amount}</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
