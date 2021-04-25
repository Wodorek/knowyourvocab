import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../../common/UIElements/Button';
import { setWithExpiry } from '../../common/util/setWithExpiry';
import ms from 'ms';
import { getWithExpiry } from '../../common/util/getWithExpiry';

const StContainer = styled.div`
  margin-top: 3rem;
`;

const StForm = styled.form`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const StLabel = styled.label`
  font-size: 1.5rem;
`;

const StInput = styled.input`
  font-size: 1.5rem;
`;

const StErrorMsg = styled.p`
  color: red;
`;

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [backError, setBackError] = useState('');

  const modeChangeHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isSignupMode) {
      unregister('verificationString');
    }
    setIsSignupMode((prev) => !prev);
  };

  const submitHandler = handleSubmit(async (data) => {
    setBackError('');
    const endpoint = isSignupMode ? 'signup' : 'login';

    const normalizedName = data.username.toLocaleLowerCase();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/auth/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: normalizedName,
            password: data.password,
            verificationString: data.verificationString,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const tokenExp = +ms(responseData.tokenExp);

      setWithExpiry('token', responseData.token, tokenExp);

      history.push('/admin');
    } catch (error) {
      setBackError(error.message);
    }
  });

  useEffect(() => {
    //if token exists ie. user logged in in last 3 days, auto redirect to admin page
    if (getWithExpiry('token')) {
      history.push('/admin');
    }
  }, [history]);

  return (
    <StContainer>
      <StForm onSubmit={submitHandler}>
        <InputBox>
          <StLabel htmlFor="username">Name</StLabel>
          <StInput type="text" {...register('username', { required: true })} />
          {errors.username && <StErrorMsg>Please enter a username</StErrorMsg>}
        </InputBox>
        <InputBox>
          <StLabel htmlFor="password">Password</StLabel>
          <StInput
            type="password"
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password && (
            <StErrorMsg>Password must be at least 8 characters long</StErrorMsg>
          )}
        </InputBox>
        {isSignupMode ? (
          <InputBox>
            <StLabel htmlFor="verificationString">Verification String</StLabel>
            <StInput
              type="text"
              {...register('verificationString', { required: true })}
            />
          </InputBox>
        ) : null}

        <Button type="submit">{isSignupMode ? 'Signup' : 'Login'}</Button>
        <Button onClick={(e) => modeChangeHandler(e)}>
          Change to {isSignupMode ? 'login' : 'signup'}
        </Button>
        <StErrorMsg>{backError}</StErrorMsg>
      </StForm>
    </StContainer>
  );
};

export default LoginScreen;
