import { observable, action, runInAction } from 'mobx';

export class InteractionState {
  @observable hoveredBreweryId: string;
  @observable brewerySearchString: string = '';

  @action.bound
  setBrewerySearchString(search: string) {
    this.brewerySearchString = search;
  }
}

export const InteractionStore = new InteractionState();
