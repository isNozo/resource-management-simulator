export function addResource(resources: Resource[], resource: Resource): Resource[] {
  return [...resources, resource];
}

export function removeResource(resources: Resource[], id: string): Resource[] {
  return resources.filter((r) => r.id !== id);
}

export function findResource(resources: Resource[], id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
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
