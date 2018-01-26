import * as React from 'react'
import styled from 'styled-components';
import Map from 'Components/Map';
import MapMarker from 'Components/MapMarker';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    mongo: {
      breweries: {
        name: string
        lat: number
        lng: number
      }[]
    }
  }
}

  // <Map />
export default ({ data }: IndexPageProps) => {
  const breweries = data.mongo.breweries;

  return (
    <Map>
      { breweries.map((brewery) =>
        <MapMarker key = { brewery.id }
          lat = { brewery.lat }
          lng = { brewery.lng }
          breweryId = { brewery.id }
        />
      )}
    </Map>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    mongo {
      breweries {
        id,
        name,
        lat,
        lng
      }
    }
  }
`
