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
  return (
    <StContainer show={props.show}>
      <StMessageBox>
        <StHeading>Instrukcja</StHeading>
        <StMessage>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          officiis consectetur eveniet quos, error libero eius recusandae harum
          aliquam minus, cum facilis culpa dolores repellendus impedit,
          voluptates atque cumque dolorum? Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Molestiae, corporis ipsam adipisci
          debitis illo nemo doloribus voluptate? Ratione earum quidem cupiditate
          aspernatur maxime modi perferendis! Iusto eligendi adipisci harum
          aliquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Similique suscipit asperiores pariatur labore voluptas quod odio
          tempora corporis numquam ducimus maxime, est repellat quibusdam eaque
          tempore, voluptatibus nobis, recusandae doloremque? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Illum, consequuntur inventore
          debitis perferendis cumque beatae neque doloribus veritatis voluptate.
          Aperiam earum, eos perferendis voluptate harum possimus quam
          cupiditate expedita fugit.
        </StMessage>
        <Button type="button" onClick={(event) => props.startQuiz(event)}>
          Start
        </Button>
      </StMessageBox>
    </StContainer>
  );
};

export default Modal;
