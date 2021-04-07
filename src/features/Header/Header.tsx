import React from 'react';
import styled from 'styled-components';

interface IProps {
  heading: string;
}

const StHeader = styled.h1`
  background: #dbeef3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px black;
  margin: 0;
  font-size: 1rem;
  @media (max-width: 974px) {
    width: calc(40rem + 6px);
  }
`;

const Header: React.FC<IProps> = (props) => {
  return <StHeader>{props.heading}</StHeader>;
};

export default Header;
