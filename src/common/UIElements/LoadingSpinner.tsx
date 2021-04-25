import React from 'react';
import styled, { keyframes } from 'styled-components';

const ring = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }


`;

const StSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 160px;
  height: 160px;

div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 128px;
  height: 128px;
  margin: 16px;
  border: 16px solid black;
  border-radius: 50%;
  animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}
div:nth-child(1) {
  animation-delay: -0.45s;
}
div:nth-child(2) {
  animation-delay: -0.3s;
}
div:nth-child(3) {
  animation-delay: -0.15s;
}


}`;

// .lds-ring div {
//   box-sizing: border-box;
//   display: block;
//   position: absolute;
//   width: 64px;
//   height: 64px;
//   margin: 8px;
//   border: 8px solid #fff;
//   border-radius: 50%;
//   animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//   border-color: #fff transparent transparent transparent;
// }
// .lds-ring div:nth-child(1) {
//   animation-delay: -0.45s;
// }
// .lds-ring div:nth-child(2) {
//   animation-delay: -0.3s;
// }
// .lds-ring div:nth-child(3) {
//   animation-delay: -0.15s;
// }
// @keyframes lds-ring {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

const LoadingSpinner = () => {
  return (
    <StSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StSpinner>
  );
};

export default LoadingSpinner;
