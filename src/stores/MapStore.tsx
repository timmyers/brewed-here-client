import { observable } from 'mobx';

interface Viewbox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

class MapState {
  @observable viewbox: Viewbox = {
    top: 0, bottom: 0, left: 0, right: 0,
  };
}

export const MapStore = new MapState();
