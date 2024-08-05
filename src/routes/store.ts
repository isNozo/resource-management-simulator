import { browser } from '$app/environment'
import { writable } from 'svelte/store';

export let resources = writable([] as Resource[]);
export let recipes = writable([] as Recipe[]);

if (browser) {
	const savedResources = localStorage.getItem('savedResources');
	if (savedResources) {
		resources = writable(JSON.parse(savedResources));
	}

	const savedRecipes = localStorage.getItem('savedRecipes');
	if (savedRecipes) {
		recipes = writable(JSON.parse(savedRecipes));
	}

	resources.subscribe(value => {
		localStorage.setItem('savedResources', JSON.stringify(value));
	});

	recipes.subscribe(value => {
		localStorage.setItem('savedRecipes', JSON.stringify(value));
	});
}
