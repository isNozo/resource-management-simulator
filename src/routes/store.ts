import { browser } from '$app/environment'
import { writable } from 'svelte/store';

export let resources = writable([] as Resource[]);
export let actions = writable([] as Action[]);

if (browser) {
	const savedResources = localStorage.getItem('savedResources');
	if (savedResources) {
		resources = writable(JSON.parse(savedResources));
	}

	const savedActions = localStorage.getItem('savedActions');
	if (savedActions) {
		actions = writable(JSON.parse(savedActions));
	}

	resources.subscribe(value => {
		localStorage.setItem('savedResources', JSON.stringify(value));
	});

	actions.subscribe(value => {
		localStorage.setItem('savedActions', JSON.stringify(value));
	});
}
