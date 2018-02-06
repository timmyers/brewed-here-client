import { Brewery } from 'Stores/BreweryStore';

export const sortBreweriesByName = (breweries: Brewery[]) => {
  return breweries.sort((a: Brewery, b: Brewery) => a.name.localeCompare(b.name));
}