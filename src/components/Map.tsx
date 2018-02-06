import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxglAny = mapboxgl as any;

mapboxglAny.accessToken =
  'pk.eyJ1IjoidGltbXllcnMiLCJhIjoiY2phcm9uNHhsNGxyYzMzcGRpaWptMDV6ZCJ9.fI92wckRDkzqVEZipg6crQ';

interface MapProps {
  children?: React.ReactNode;
}

interface MapState {
  ready: boolean;
}

class Map extends React.Component<MapProps, MapState> {
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
    // this.map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v10',
    //   center: [-104.990482, 39.710206],
    //   zoom: 10,
    // });  
    // this.setState({ ready: true });
  }

  componentDidUpdate() {
    this.map.resize();
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    // necessary so that gatsby build will work properly
    if (typeof window === `undefined`) { return null; }

    const { ready } = this.state;
    
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <div style={style} ref={(el: any) => this.mapContainer = el}>
        { ready && this.props.children }
      </div>
    );
  }
}

export default Map;
