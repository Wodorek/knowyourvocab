import React from 'react';
import styled from 'styled-components';

interface IProps {
  onClick: React.MouseEventHandler;
  type?: 'submit' | undefined;
}

const StButton = styled.button`
  width: auto;
  font-size: 2rem;
`;

const Button: React.FC<IProps> = (props) => {
  return (
    <StButton type={props.type} onClick={props.onClick}>
      {props.children}
    </StButton>
  );
};

export default Button;
