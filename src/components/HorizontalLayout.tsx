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
  ${(props: HorizontalLayoutProps) => props.full && 'height: 100%; width: 100%;'}
  ${(props: HorizontalLayoutProps) => props.fullHeight && 'height: 100%;'}
  ${(props: HorizontalLayoutProps) => props.fullWidth && 'width: 100%;'}
  ${(props: HorizontalLayoutProps) => props.scroll &&
    'overflow: scroll; max-width: 100%; -webkit-overflow-scrolling: touch;'}
  ${(props: HorizontalLayoutProps) => props.alignCenter && 'align-items: center;'}
  ${(props: HorizontalLayoutProps) => props.justifyEnd && 'justify-content: flex-end;'}
  ${(props: HorizontalLayoutProps) => props.justifyStart && 'justify-content: flex-start;'}
  ${(props: HorizontalLayoutProps) => props.grow && 'flex-grow: 1;'}
`;

export default HorizontalLayout;
