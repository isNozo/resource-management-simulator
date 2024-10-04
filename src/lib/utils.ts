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

export function addAction(actions: Action[], action: Action): Action[] {
	return [...actions, action];
}

export function removeAction(actions: Action[], id: string): Action[] {
	return actions.filter((a) => a.id !== id);
}

export function findAction(actions: Action[], id: string): Action | undefined {
	return actions.find((a) => a.id === id);
}

export function copyActions(actions: Action[]): Action[] {
	return actions.map((a) => ({
		id: a.id,
		name: a.name,
		consumedResources: copyResources(a.consumedResources),
		producedResources: copyResources(a.producedResources)
	}));
}

export function addState(states: State[], state: State): State[] {
	return [...states, state];
}

export function removeState(states: State[], id: string): State[] {
	return states.filter((s) => s.id !== id);
}

export function findState(states: State[], id: string): State | undefined {
	return states.find((s) => s.id === id);
}

export function isActionApplicable(resources: Resource[], action: Action): boolean {
	return action.consumedResources.every((r) => {
		const resource = findResource(resources, r.id);
		return resource !== undefined && resource.amount >= r.amount;
	});
}

export function applyAction(resources: Resource[], action: Action): Resource[] | undefined {
	if (!isActionApplicable(resources, action)) {
		return undefined;
	}

	let newResources = copyResources(resources);

	newResources = newResources.map((resource) => {
		for (let consumedResource of action.consumedResources) {
			if (resource.id === consumedResource.id) {
				resource.amount -= consumedResource.amount;
			}
		}
		for (let producedResource of action.producedResources) {
			if (resource.id === producedResource.id) {
				resource.amount += producedResource.amount;
			}
		}
		return resource;
	});

	return newResources;
}

export function applyAllActions(resources: Resource[], actions: Action[]): State[] {
	let states : State[] = [];

	actions.forEach(action => {
		const newResources = applyAction(resources, action);
		if (newResources) {
			states = addState(states, {
				id: action.name,
				resources: newResources,
				nextStates: []
			});
		}
	});

	return states;
}
