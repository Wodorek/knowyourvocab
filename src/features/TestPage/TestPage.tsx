import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../../common/UIElements/Button';
import { wakeUpApi } from '../../common/util/wakeUpApi';
import Diagnosis from '../Diagnosis/Diagnosis';
import { startTest } from '../Diagnosis/diagnosisSlice';
import Modal from '../Modal/Modal';

const StContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 2rem;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const TestPage = () => {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isOn = useSelector((state: RootStateOrAny) => state.diagnosis.isOn);
  const isFinished = useSelector(
    (state: RootStateOrAny) => state.diagnosis.isFinished
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const goodAnswers = useSelector(
    (state: RootStateOrAny) => state.questions.correctAnswers
  );

  const badAnswers = useSelector(
    (state: RootStateOrAny) => state.questions.incorrectAnswers
  );

  const sendDiagnosisHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === '') {
      alert('Proszę się podpisać');
      return;
    }
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}/students/postDiagnosis`, {
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
    setShowModal(false);
    dispatch(startTest());
  };

  useEffect(() => {
    //wake up sleeping api when a studen opens up the page. I think this is a better solution than making a studen wait 10 second on sending the complete test.
    wakeUpApi();
  }, []);

  return (
    <StContainer>
      <Diagnosis />
      <Modal startQuiz={startTestHandler} show={showModal} />
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
          <Button margin={2.5} onClick={(event) => sendDiagnosisHandler(event)}>
            Wyślij
          </Button>
        </>
      ) : (
        <Button margin={2.5} type="button" onClick={() => setShowModal(true)}>
          Instrukcja
        </Button>
      )}
    </StContainer>
  );
};

export default TestPage;
