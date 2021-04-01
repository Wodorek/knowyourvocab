import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './common/themes/theme';
import AdminPage from './features/AdminPage/AdminPage';
import TestPage from './features/TestPage/TestPage';

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
      <BrowserRouter>
        <Container>
          <Switch>
            <Route path="/admin" component={AdminPage} />
            <Route path="/" component={TestPage} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
