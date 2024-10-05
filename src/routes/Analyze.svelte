<script lang="ts">
	import { calcAllStates } from '$lib/utils';
	import { resources, actions } from './store';

    function handleAnalyze(){
        const initState = {id: crypto.randomUUID(), resources: $resources};
        const states = calcAllStates(initState, $actions);

        for (let state of states) {
            console.log("state:", state.id);
            for (let resource of state.resources) {
                console.log(resource);
            }
        }
    }
</script>

<button on:click={handleAnalyze}>Analyze</button>