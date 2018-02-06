import { observable, computed, toJS } from 'mobx';
import * as FuzzySearch from 'fuzzy-search';
// import { MapStore } from 'State/Map';
import { InteractionStore } from 'Stores/InteractionStore';

export interface Brewery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
}

export class BreweryState {
  @observable breweries: Brewery[] = [];

  @computed get sortedBreweries() {
    return this.breweries.sort((a: Brewery, b: Brewery) => a.name.localeCompare(b.name));
  }

  @computed get breweriesMatchingSearch() {
    if (!this.sortedBreweries.length ||
      !InteractionStore.brewerySearchString.length) {
      return [];
    }

    const searcher = new FuzzySearch(
      this.sortedBreweries,
      ['name'],
      {},
    );

    const result = searcher.search(InteractionStore.brewerySearchString);
    return result;
  }

}

export const BreweryStore = new BreweryState();
