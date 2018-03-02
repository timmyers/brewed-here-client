import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import HorizontalLayout from 'Components/HorizontalLayout';
import VerticalLayout from 'Components/VerticalLayout';
import { AuthState } from 'Stores/AuthStore';
import BreweryTitle from './BreweryTitle';
import BreweryLocation from './BreweryLocation';
import BreweryVisited from './BreweryVisited';
import BreweryWebsite from './BreweryWebsite';
import BreweryPermanentlyClosed from './BreweryPermanentlyClosed';

interface ItemProps {
  brewery: any;
  mutate: any;
  hovered: boolean;
  AuthStore: AuthState;
}

const Outer = styled.div`
  margin: 0px 0px;
  padding: 10px;
  transition-duration: 150ms;
`;

const OuterPhone = styled.div`
  margin: 0px 0px;
  padding: 5px;
  width: 200px;
  transition-duration: 150ms;
`;

interface InnerProps {
  full: boolean;
}

const Inner = styled(VerticalLayout)`
  align-items: center;
  justify-content: flex-start;
`;
const InnerTyped: React.StatelessComponent<InnerProps> = props => (
  <Inner {...props }/>
);

const Row = styled(HorizontalLayout)`
  width: 100%;
  margin-top: 5px;
  align-items: center;
  justify-content: flex-start;
`;

@inject('AuthStore')
@observer
class Item extends React.Component<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    if (newProps.brewery.visited !== this.props.brewery.visited) return true;
    if (newProps.hovered !== this.props.hovered) return true;
    return false;
  }
  render() {
    const { brewery, mutate, hovered, AuthStore } = this.props;

    const OuterUsed = Outer;

    return (
      <OuterUsed>
        <InnerTyped
          full
        >
          <BreweryTitle title={brewery.name} />
          { (brewery.locationName || brewery.website) &&
            <Row>
              { brewery.locationName && 
                <BreweryLocation title={brewery.locationName } />
              }
              { brewery.website &&
                <BreweryWebsite url={brewery.website} />
              }
            </Row>
          }
          <Row>
            { AuthStore.loggedIn && 
              <BreweryVisited
                visited={brewery.visited === undefined ? false : brewery.visited}
                onChange={(checked: any) => {
                  console.log('mutate', checked);
                  mutate({
                    variables: {
                      brewery: brewery.id,
                      visited: checked,
                    },
                  });
                }}
              />
            }
            { brewery.closed && <BreweryPermanentlyClosed />}
          </Row>
        </InnerTyped>
      </OuterUsed>
    );
  }
}

const ItemQL = graphql(gql`
  mutation setVisited($brewery: String!, $visited: Boolean!) {
    setVisited(brewery: $brewery, visited: $visited) {
      id, visited
    }
  }
`)(Item);

export default ItemQL;
