import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/UIElements/Button';
import Diagnosis from '../diagnosis/Diagnosis';

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

  const goodAnswers = useSelector(
    (state: RootStateOrAny) => state.diagnosis.correct
  );

  const badAnswers = useSelector(
    (state: RootStateOrAny) => state.diagnosis.incorrect
  );

  const sendDiagnosisHandler = async (event: React.SyntheticEvent) => {
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
  };

  return (
    <StContainer>
      <Diagnosis />
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
      <Button onClick={(event) => sendDiagnosisHandler(event)} />
    </StContainer>
  );
};

export default TestPage;
