import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../../common/UIElements/Button';

interface IProps {
  show: boolean;
  startQuiz: Function;
}

const fadeIn = keyframes`
0%{
  transform: scale(0)
}
100%{
 transform: scale(1)
}
`;

const StContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.55);
`;

const StMessageBox = styled.div`
  background: white;
  width: 40%;
  min-height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  animation: 0.3s ${fadeIn};
`;

const StHeading = styled.h1`
  margin: 0;
`;

const StMessage = styled.p``;

const Modal: React.FC<IProps> = (props) => {
  //TODO write real instructions
  return (
    <StContainer show={props.show}>
      <StMessageBox>
        <StHeading>Instrukcja</StHeading>
        <StMessage>
          Przed Tobą diagnoza! <br /> Po jej rozwiązaniu dowiesz się ile słów
          znasz w języku angielskim 😊
          <br />
          <br />
          Jak postępować? Przetłumacz polskie słowa na język angielski, swoją
          odpowiedź wpisz w polu, w którym znajduje się kursor. Kiedy będziesz
          gotowa/gotowy na kolejne pytanie, naciśnij „enter”. Na każdą odpowiedź
          masz 10 sekund. Po upływie tego czasu program automatycznie pokaże
          poprawną odpowiedź i przekieruje Cię do kolejnego słowa, tj.
          następnego pola na prawo. W tej kolejności należy rozwiązać test. Nie
          omijaj pytań, klikając w dowolne pole.
          <br /> Po 20 błędnych odpowiedziach/braku odpowiedzi pod rząd, test
          zostanie automatycznie przerwany.
          <br />
          Wynik testu i wszelkie pytania omówisz z nauczycielem na lekcji 😊
          <br />
          Powodzenia!
        </StMessage>
        <Button type="button" onClick={(event) => props.startQuiz(event)}>
          Start
        </Button>
      </StMessageBox>
    </StContainer>
  );
};

export default Modal;
