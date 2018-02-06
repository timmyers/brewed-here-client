import { observable } from 'mobx';

export class InteractionState {
  @observable hoveredBreweryId: string;
  @observable brewerySearchString: string = '';
}

export const InteractionStore = new InteractionState();
