import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../../common/themes/theme';

interface IProps {
  color: string;
}

const StContainer = styled.div`
  border: 2px solid
    ${(props) => {
      if (props.color) {
        const idx = props.color as keyof typeof theme;
        return theme[idx];
      }
    }};
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.color) {
      const idx = props.color as keyof typeof theme;
      return theme[idx];
    }
  }};
  min-width: 11rem;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`;

const StText = styled.p`
  margin: 0;
`;

//TODO this could use some styling
const InformationBox: React.FC<IProps> = (props) => {
  const totals = useSelector(
    (state: RootStateOrAny) => state.answers.totals[props.color]
  ).toFixed(0);

  const percentage = useSelector(
    (state: RootStateOrAny) => state.answers.percentage[props.color]
  ).toFixed(0);

  return (
    <>
      <StContainer color={props.color}>
        <StText>{totals} słówek</StText>
        <StText>{percentage} %</StText>
      </StContainer>
    </>
  );
};

export default InformationBox;
