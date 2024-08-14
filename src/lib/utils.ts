export function addResource(resources: Resource[], resource: Resource): Resource[] {
	return [...resources, resource];
}

export function removeResource(resources: Resource[], id: string): Resource[] {
	return resources.filter((r) => r.id !== id);
}

export function findResource(resources: Resource[], id: string): Resource | undefined {
	return resources.find((r) => r.id === id);
}

export function copyResources(resources: Resource[]): Resource[] {
	return resources.map((r) => ({...r}));
}

export function addRecipe(recipes: Recipe[], recipe: Recipe): Recipe[] {
	return [...recipes, recipe];
}

export function removeRecipe(recipes: Recipe[], id: string): Recipe[] {
	return recipes.filter((r) => r.id !== id);
}

export function findRecipe(recipes: Recipe[], id: string): Recipe | undefined {
	return recipes.find((r) => r.id === id);
}

export function copyRecipes(recipes: Recipe[]): Recipe[] {
	return recipes.map((r) => ({
		id: r.id,
		name: r.name,
		consumedResources: copyResources(r.consumedResources),
		producedResources: copyResources(r.producedResources)
	}));
}

export function isRecipeApplicable(resources: Resource[], recipe: Recipe): boolean {
	return recipe.consumedResources.every((r) => {
		const resource = findResource(resources, r.id);
		return resource !== undefined && resource.amount >= r.amount;
	});
}

export function applyRecipe(resources: Resource[], recipe: Recipe): Resource[] {
	if (!isRecipeApplicable(resources, recipe)) {
		return resources;
	}

	let newResources = copyResources(resources);

	newResources = newResources.map((resource) => {
		for (let consumedResource of recipe.consumedResources) {
			if (resource.id === consumedResource.id) {
				resource.amount -= consumedResource.amount;
			}
		}
		for (let producedResource of recipe.producedResources) {
			if (resource.id === producedResource.id) {
				resource.amount += producedResource.amount;
			}
		}
		return resource;
	});

	return newResources;
}
