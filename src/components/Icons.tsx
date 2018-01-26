import * as React from 'react';
import * as BeerMapMarkerImage from '../images/beer_map_marker.svg';

type IconProps = React.HTMLProps<HTMLImageElement>;

export const BeerMapMarker = (props: IconProps) => (
  <img src={BeerMapMarkerImage} {...props} />
);