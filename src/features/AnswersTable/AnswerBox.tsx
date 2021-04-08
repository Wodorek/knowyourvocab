import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { calculate } from './answersSlice';

interface IProps {
  question: string;
  answer: string;
  ok: boolean;
  color: string;
}

const StContainer = styled.div`
  border-bottom: solid 2px black;
  font-size: 0.8rem;
  width: auto;
  margin: 0;
  height: 1rem;
  display: flex;
`;

const StQuestion = styled.div`
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  text-align: center;
  line-height: 1rem;
  width: 10rem;
  font-weight: bold;
  height: inherit;
  background: ${(props) => props.color};
`;

const StAnswer = styled.div`
  padding: 0;
  text-align: center;
  font-size: inherit;
  border: none;
  border-bottom: solid 2px black;
  border-right: solid 2px black;
  height: inherit;
  width: 10rem;
  background: ${(props) => (props.ok ? 'chartreuse' : 'orangeRed')};
`;

const AnswerBox: React.FC<IProps> = (props) => {
  const [ok, setOk] = useState(props.ok);

  const dispatch = useDispatch();

  const changeQuestionStatus = () => {
    setOk((prevOk) => !prevOk);
    dispatch(calculate({ color: props.color }));
  };

  return (
    <StContainer>
      <StQuestion color={props.color}>{props.question}</StQuestion>
      <StAnswer onClick={changeQuestionStatus} ok={ok}>
        {props.answer}
      </StAnswer>
    </StContainer>
  );
};

export default AnswerBox;
