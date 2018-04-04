import { observable, computed, autorun, toJS } from 'mobx';
import gql from 'graphql-tag';
import * as Fuse from 'fuse.js';
import { AuthStore } from 'Stores/AuthStore';
import { client } from 'Utils/Apollo';
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
    // console.log('num breweries', this.breweries.length, performance.now());
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

if (typeof window !== 'undefined') {
  const query = gql`
    query {
      allBreweries {
        id,
        name,
        locationName,
        website,
        lat,
        lng,
        closed,
        visited
      }
    }
  `;

  const observableQuery =
    client.watchQuery({
      query,
    });

  observableQuery.subscribe({
    next: ({ data }: { data: any }) => {
      // console.log('gotbreweries', data.allBreweries, performance.now());
      BreweryStore.breweries = data.allBreweries;
    },
  });

  autorun(() => {
    if (AuthStore.loggedIn) {
      console.log('Refreshing breweries with user', performance.now());
      client.query({
        query: gql`
          query {
            allBreweries {
              id, visited
            }
          }
        `,
        fetchPolicy: 'network-only',
      });
    }
  })
}