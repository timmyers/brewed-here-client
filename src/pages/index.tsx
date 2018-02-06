import * as React from 'react'
import styled from 'styled-components';
import Map from 'Components/Map';
import MapMarker from 'Components/MapMarker';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import BreweryList from 'Components/BreweryList';

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

const LeftSide = styled(VerticalLayout) `
  height: 100%;
  flex-grow: 1;
`;

const RightSide = styled(VerticalLayout) `
  height: 100%;
  width: 300px;
  justify-content: flex-start;
  background-color: #f8f8f8;
`;

const ListHolder = styled.div`
  width: 100%;
  position: relative;
  flex-grow: 1;
`;

export default ({ data }: IndexPageProps) => {
  const breweries = data.mongo.breweries;

  return (
    <HorizontalLayout full>
      <LeftSide>
        <Map>
          { breweries.map((brewery) =>
            <MapMarker 
              key = { brewery.id }
              lat = { brewery.lat }
              lng = { brewery.lng }
              breweryId = { brewery.id }
            />
          )}
        </Map>
      </LeftSide>
      <RightSide key={'rhs'}>
        <ListHolder>
          <BreweryList breweries={breweries} />
        </ListHolder>
      </RightSide>
    </HorizontalLayout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    mongo {
      breweries {
        id,
        name,
        lat,
        lng,
        closed,
        locationName,
        website,
      }
    }
  }
`
