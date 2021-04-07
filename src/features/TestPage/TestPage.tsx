import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../../common/UIElements/Button';
import Diagnosis from '../diagnosis/Diagnosis';
import { startTest } from '../diagnosis/diagnosisSlice';

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const TestPage = () => {
  const [name, setName] = useState('');
  const isOn = useSelector((state: RootStateOrAny) => state.diagnosis.isOn);
  const isFinished = useSelector(
    (state: RootStateOrAny) => state.diagnosis.isFinished
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const goodAnswers = useSelector(
    (state: RootStateOrAny) => state.diagnosis.correct
  );

  const badAnswers = useSelector(
    (state: RootStateOrAny) => state.diagnosis.incorrect
  );

  const sendDiagnosisHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === '') {
      return;
    }
    try {
      await fetch('http://localhost:3030/students/postDiagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          goodAnswers,
          badAnswers,
        }),
      });
    } catch (error) {}
    history.push('/endMessage');
  };

  const startTestHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(startTest());
  };

  return (
    <StContainer>
      <Diagnosis />

      {isOn || isFinished ? (
        <>
          <NameBox>
            <label htmlFor="initials">Inicjały</label>
            <input
              required={true}
              name="initials"
              onChange={(event) =>
                setName((event.target as HTMLInputElement).value)
              }
              value={name}
            />
          </NameBox>
          <Button onClick={(event) => sendDiagnosisHandler(event)}>
            Wyślij
          </Button>
        </>
      ) : (
        <Button onClick={(event) => startTestHandler(event)}>Start</Button>
      )}
    </StContainer>
  );
};

export default TestPage;
