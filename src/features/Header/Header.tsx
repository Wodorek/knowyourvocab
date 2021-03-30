import React from 'react';
import styled from 'styled-components';

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

const Header = () => {
  return <StHeader>DIAGNOZA UCZNIA</StHeader>;
};

export default Header;
