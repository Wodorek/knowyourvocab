import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { correctAnswer } from '../diagnosis/diagnosisSlice';

interface IProps {
  name: string;
  color: string;
  answers: string[] | string;
  disabled: boolean;
  correct: boolean | null;
  refer: any;
  focusNext: Function;
}

const StContainer = styled.div`
  border-bottom: solid 2px black;
  font-size: 0.8rem;
  width: auto;
  margin: 0;
  height: 1rem;
  display: flex;
`;

const StInput = styled.input`
  padding: 0;
  text-align: center;
  font-size: inherit;
  border: none;
  border-bottom: solid 2px black;
  border-right: solid 2px black;
  height: inherit;
  width: 10rem;
  background: ${(props) => {
    if (props.disabled === true && props.ok === true) {
      return 'Chartreuse';
    }
    if (props.disabled === true && props.ok === false) {
      return 'red';
    }
    if (props.disabled === false) {
      return 'white';
    }
    if (props.disabled === true) {
      return 'DarkGrey';
    }
  }};
  /* color: ${(props) => (props.disabled ? 'white' : 'black')}; */
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
`;

const StLabel = styled.label`
  border-right: solid 2px black;
  border-bottom: solid 2px black;
  text-align: center;
  line-height: 1rem;
  width: 10rem;
  font-weight: bold;
  height: inherit;
  background: ${(props) => props.color || 'white'};
`;

const QuestionBox: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const validateQuestion = (event: any) => {
    event.preventDefault();

    if (props.answers.includes(value)) {
      setIsCorrect(true);
      dispatch(correctAnswer());
    } else {
      setIsCorrect(false);
      setValue(props.answers[0]);
    }

    props.focusNext(props.name);
    setDone(true);
  };
  return (
    <form onSubmit={(event) => validateQuestion(event)}>
      <StContainer>
        <StLabel color={props.color} htmlFor={props.name}>
          {props.name}
        </StLabel>
        <StInput
          ref={props.refer}
          autoComplete="off"
          ok={isCorrect}
          disabled={done || props.disabled}
          onChange={(event) =>
            setValue((event.target as HTMLInputElement).value)
          }
          value={value}
          name={props.name}
        />
      </StContainer>
    </form>
  );
};

export default QuestionBox;
