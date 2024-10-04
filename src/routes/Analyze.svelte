<script lang="ts">
	import { applyAllActions } from '$lib/utils';
	import { resources, actions } from './store';

	$: states = applyAllActions($resources, $actions);
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
