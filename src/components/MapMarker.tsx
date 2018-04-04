import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { BeerMapMarker, BeerMapMarkerVisited } from 'Components/Icons';

const CustomMarker: any = styled(BeerMapMarker)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -20px;
`;

const CustomMarkerVisited: any = styled(BeerMapMarkerVisited)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -20px;
`;

interface MapMarkerProps {
  lat: number;
  lng: number;
  visited: boolean;
  breweryId: string;
  hovered: boolean;
}

class MapMarker extends React.Component<MapMarkerProps, {}> {
  markerContainer: HTMLElement;
  marker: mapboxgl.Marker;

  static contextTypes = {
    map: PropTypes.object,
  };

  manualRender() {
    const marker = this.props.visited ? <CustomMarkerVisited /> : <CustomMarker />
    ReactDOM.render(marker, this.markerContainer);
  }

  shouldComponentUpdate(nextProps: MapMarkerProps) {
    return nextProps.visited !== this.props.visited ||
      nextProps.hovered !== this.props.hovered;
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.remove();
    }
  }

  componentDidMount() {
    this.markerContainer = document.createElement('div');
    this.manualRender();

    this.marker = new mapboxgl.Marker(this.markerContainer)
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.context.map);
  }

  componentDidUpdate() {
    this.manualRender();
  }

  render() { return null; }
}

export default MapMarker;
