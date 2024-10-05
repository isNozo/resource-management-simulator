// place files you want to import through the `$lib` alias in this folder.
type Resource = {
	id: string;
	name: string;
	amount: number;
};

type Action = {
	id: string;
	name: string;
	consumedResources: Resource[];
	producedResources: Resource[];
};

type State = {
	id: string;
	resources: Resource[];
}

type Identifiable = { id: string };