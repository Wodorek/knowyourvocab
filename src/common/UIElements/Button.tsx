import React from 'react';
import styled from 'styled-components';

interface IProps {
  onClick: React.MouseEventHandler;
  type?: 'submit' | undefined;
}

const StButton = styled.button`
  width: 4rem;
`;

const Button: React.FC<IProps> = (props) => {
  return (
    <StButton type={props.type} onClick={props.onClick}>
      send
    </StButton>
  );
};

export default Button;
