import * as React from 'react';
import styled from 'styled-components';

interface VerticalLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
  scroll?: boolean;
}

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  ${(props: VerticalLayoutProps) => props.full && 'height: 100%; width: 100%;'}
  ${(props: VerticalLayoutProps) => props.scroll && 'overflow: scroll; max-height: 100%; -webkit-overflow-scrolling: touch;'}
`;

export default VerticalLayout;
