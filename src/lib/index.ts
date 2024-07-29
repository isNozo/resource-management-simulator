// place files you want to import through the `$lib` alias in this folder.
type Resource = {
  id: string;
  name: string;
};

type Recipe = {
  id: string;
  name: string;
  consumedResources: Resource[];
  producedResources: Resource[];
};