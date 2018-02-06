import { observable, computed, toJS } from 'mobx';
import * as Fuse from 'fuse.js';
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
    const result = this.breweries.sort((a: Brewery, b: Brewery) => a.name.localeCompare(b.name));

    if (result.length) {
      this.searcher = new Fuse(
        result,
        {
          threshold: .2,
          keys: ['name']
        }
      );
    }

    return result;
  }

  @computed get breweriesMatchingSearch() {
    if (!this.sortedBreweries.length ||
      !InteractionStore.brewerySearchString.length) {
      return [];
    }

    const start = performance.now()
    const result = this.searcher.search(InteractionStore.brewerySearchString);
    console.log('search took', performance.now() - start)
    return result;
  }

}

export const BreweryStore = new BreweryState();
