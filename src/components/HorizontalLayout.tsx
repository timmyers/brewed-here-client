import * as React from 'react';
import styled from 'styled-components';

interface HorizontalLayoutProps extends React.HTMLProps<HTMLDivElement> {
  full?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  scroll?: boolean;
  alignCenter?: boolean;
  justifyEnd?: boolean;
  justifyStart?: boolean;
  grow?: boolean;
}

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  ${(props: any) => props.full && 'height: 100%; width: 100%;'}
  ${(props: any) => props.fullHeight && 'height: 100%;'}
  ${(props: any) => props.fullWidth && 'width: 100%;'}
  ${(props: any) => props.scroll &&
        'overflow: scroll; max-width: 100%; -webkit-overflow-scrolling: touch;'}
  ${(props: any) => props.alignCenter && 'align-items: center;'}
  ${(props: any) => props.justifyEnd && 'justify-content: flex-end;'}
  ${(props: any) => props.justifyStart && 'justify-content: flex-start;'}
  ${(props: any) => props.grow && 'flex-grow: 1;'}
`;

export default HorizontalLayout;
