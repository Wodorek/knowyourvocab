import React from 'react';
import styled from 'styled-components';

interface IProps {
  onClick?: React.MouseEventHandler;
  type?: 'submit' | undefined | 'button';
  margin?: number;
}

const StButton = styled.button<{ margin: number | undefined }>`
  width: auto;
  font-size: 2rem;
  margin-bottom: ${(props) => `${props.margin}rem`};
`;

const Button: React.FC<IProps> = (props) => {
  return (
    <StButton margin={props.margin} type={props.type} onClick={props.onClick}>
      {props.children}
    </StButton>
  );
};

export default Button;
