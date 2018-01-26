import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { observer } from 'mobx-react';
import HorizontalLayout from 'Components/HorizontalLayout';
// import MapMarker from 'Components/MapMarker';
// import { MapStore } from 'State/Map';
// import { BreweryStore } from 'State/Brewery';
// import { InteractionStore } from 'State/Interaction';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGltbXllcnMiLCJhIjoiY2phcm9uNHhsNGxyYzMzcGRpaWptMDV6ZCJ9.fI92wckRDkzqVEZipg6crQ';

interface MapState {
  ready: boolean;
}

class Map extends React.Component<{}, MapState> {
  map: mapboxgl.Map;
  mapContainer: Element;

  state: MapState = {
      ready: false,
  };

  static childContextTypes = {
      map: PropTypes.object,
  };

  getChildContext() {
      return {
          map: this.map,
      };
  }

  componentDidMount() {
      this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [-104.990482, 39.710206],
          zoom: 10,
      });
  }

  componentDidUpdate() {
      this.map.resize();
  }

  componentWillUnmount() {
      this.map.remove();
  }

  render() {
    const { ready } = this.state;

    const style = {
      height: '100%',
      width: '100%',
    };

    return (
      <div style={style} ref={(el: any) => this.mapContainer = el}>
      </div>
    );
  }
}

// const MapWithData = () => (
//   <Map breweryStore={BreweryStore} interactionStore={InteractionStore} />
// );

export default Map;
