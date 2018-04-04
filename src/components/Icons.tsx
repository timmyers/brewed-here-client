import * as React from 'react';
import * as BeerMapMarkerImage from '../images/beer_map_marker.svg';
import * as BeerMapMarkerVisitedImage from '../images/beer_map_marker_visited.svg';

type IconProps = React.HTMLProps<HTMLImageElement>;

export const BeerMapMarker = (props: IconProps) => (
  <img src={BeerMapMarkerImage} {...props} />
);

export const BeerMapMarkerVisited = (props: IconProps) => (
  <img src={BeerMapMarkerVisitedImage} {...props} />
);