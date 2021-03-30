import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './common/themes/theme';
import Diagnosis from './features/diagnosis/Diagnosis';

const Container = styled.div`
  width: auto;
  display: flex;
  align-content: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Diagnosis />
      </Container>
    </ThemeProvider>
  );
}

export default App;
