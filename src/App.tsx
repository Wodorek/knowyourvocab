import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './common/themes/theme';
import AdminPage from './features/AdminPage/AdminPage';
import LoginScreen from './features/AdminPage/LoginScreen';
import EndMessage from './features/EndMessage/EndMessage';
import StudentInfo from './features/StudentInfo/StudentInfo';
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
            <Route path="/login" component={LoginScreen} />
            <Route exact path="/admin" component={AdminPage} />
            <Route path="/admin/students/:username" component={StudentInfo} />
            <Route path="/endMessage" component={EndMessage} />
            <Route path="/" component={TestPage} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
