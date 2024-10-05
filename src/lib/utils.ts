function addItem<T extends Identifiable>(items: T[], item: T): T[] {
	return [...items, item];
}

function removeItem<T extends Identifiable>(items: T[], id: string): T[] {
	return items.filter((item) => item.id !== id);
}

function findItem<T extends Identifiable>(items: T[], id: string): T | undefined {
	return items.find((item) => item.id === id);
}

function copyItems<T>(items: T[]): T[] {
	return items.map((item) => ({ ...item }));
}

export const addResource = (resources: Resource[], resource: Resource) => addItem(resources, resource);
export const removeResource = (resources: Resource[], id: string) => removeItem(resources, id);
export const findResource = (resources: Resource[], id: string) => findItem(resources, id);
export const copyResources = (resources: Resource[]) => copyItems(resources);

export const addAction = (actions: Action[], action: Action) => addItem(actions, action);
export const removeAction = (actions: Action[], id: string) => removeItem(actions, id);
export const findAction = (actions: Action[], id: string) => findItem(actions, id);
export const copyActions = (actions: Action[]) => actions.map((action) => ({
	id: action.id,
	name: action.name,
	consumedResources: copyResources(action.consumedResources),
	producedResources: copyResources(action.producedResources),
} as Action));

export const addState = (states: State[], state: State) => addItem(states, state);
export const removeState = (states: State[], id: string) => removeItem(states, id);
export const findState = (states: State[], id: string) => findItem(states, id);

export function isActionApplicable(resources: Resource[], action: Action): boolean {
	return action.consumedResources.every((consumedResource) => {
		const resource = findItem(resources, consumedResource.id);
		return resource !== undefined && resource.amount >= consumedResource.amount;
	});
}

export function applyAction(resources: Resource[], action: Action): Resource[] | undefined {
	if (!isActionApplicable(resources, action)) {
		return undefined;
	}

	const newResources = copyItems(resources).map((resource) => {
		action.consumedResources.forEach((consumedResource) => {
			if (resource.id === consumedResource.id) {
				resource.amount -= consumedResource.amount;
			}
		});
		action.producedResources.forEach((producedResource) => {
			if (resource.id === producedResource.id) {
				resource.amount += producedResource.amount;
			}
		});
		return resource;
	});

	return newResources;
}