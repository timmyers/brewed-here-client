import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { BeerMapMarker } from 'Components/Icons';

const CustomMarker: any = styled(BeerMapMarker) `
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

    shouldComponentUpdate(nextProps: MapMarkerProps) {
        return nextProps.visited !== this.props.visited ||
            nextProps.hovered !== this.props.hovered;
    }

    componentWillUnmount() {
        this.marker.remove();
    }

    setMarkerContainer(el: HTMLElement) {
        console.log(el, this.context.map);
        if (el === null) return;

        this.markerContainer = el;
        this.marker = new mapboxgl.Marker(this.markerContainer)
            .setLngLat([this.props.lng, this.props.lat])
            .addTo(this.context.map);
    }

    render() {
        return (
            <div
                ref={(el: HTMLElement) => this.setMarkerContainer(el)}
            >
                {
                    <CustomMarker />
                }
            </div>
        );
    }
}

export default MapMarker;
