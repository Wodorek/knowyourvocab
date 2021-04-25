import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './common/themes/theme';
import LoadingScreen from './common/UIElements/LoadingScreen';

const AdminPage = lazy(() => import('./features/AdminPage/AdminPage'));
const LoginScreen = lazy(() => import('./features/AdminPage/LoginScreen'));
const EndMessage = lazy(() => import('./features/EndMessage/EndMessage'));
const StudentInfo = lazy(() => import('./features/StudentInfo/StudentInfo'));
const TestPage = lazy(() => import('./features/TestPage/TestPage'));

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
        <Suspense fallback={<LoadingScreen message="Loading, please wait" />}>
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
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
