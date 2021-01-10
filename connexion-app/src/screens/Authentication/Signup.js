import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import { email_regex } from "../../utils/constants";
import SignupBg from "../../res/images/Signup.png";
import Theme from "../../Theme";
import * as actApp from "../../store/App/ac-App";
import { useAuth } from "../../AuthContext";

const Signup = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.App.isLoading);
  const history = useHistory();

  const { register, watch, handleSubmit, errors } = useForm();
  const { signup, signinGoogle } = useAuth();
  const watchPassword = watch("password", "");

  const handleEmailSignup = async (formData) => {
    const { email, password } = formData;
    try {
      dispatch(actApp.handleState("isLoading", true));
      await signup(email, password);
      dispatch(actApp.handleState("isLoading", false));
      history.push("/");

      console.log("Success Sign up");
    } catch (e) {
      console.log("Failed to sign up =>", e);
      dispatch(actApp.handleState("isLoading", false));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(actApp.handleState("isLoading", true));
      await signinGoogle();
      history.push("/");
      console.log("Success Google Login");
      dispatch(actApp.handleState("isLoading", false));
    } catch {
      console.log("Failed to login");
      dispatch(actApp.handleState("isLoading", false));
    }
  };

  return (
    <Wrapper>
      <FullpageWrapper>
        <Link to="/">
          <LogoWrapper>CONNEXION</LogoWrapper>
        </Link>
        <Form onSubmit={handleSubmit(handleEmailSignup)}>
          <Title>Create an account</Title>
          <Section>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              isErrorActive={errors.username}
              ref={register({
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be more than 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            <ErrorLabel>
              {errors.username ? errors.username.message : null}
            </ErrorLabel>
          </Section>
          <Section>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Enter your email address"
              isErrorActive={errors.email}
              ref={register({
                required: "Email address is required",
                validate: (value) => {
                  return (
                    email_regex.test(value) || "Please enter a valid email"
                  );
                },
              })}
            />
            <ErrorLabel>
              {errors.email ? errors.email.message : null}
            </ErrorLabel>
          </Section>
          <Section>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              isErrorActive={errors.password}
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be more than 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must not exceed 30 characters",
                },
                validate: (value) => {
                  return (
                    [/[a-zA-Z]/, /[0-9]/].every((pattern) =>
                      pattern.test(value)
                    ) || "Must include a letter and number"
                  );
                },
              })}
            />
            <ErrorLabel>
              {errors.password ? errors.password.message : null}
            </ErrorLabel>
          </Section>
          <Section>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              isErrorActive={errors.confirmPassword}
              ref={register({
                required: "Please confirm your password",
                validate: (value) => {
                  return (
                    watchPassword === value || "Passwords are not matching"
                  );
                },
              })}
            />
            <ErrorLabel>
              {errors.confirmPassword ? errors.confirmPassword.message : null}
            </ErrorLabel>
          </Section>
          <ButtonSection>
            <SignupButton type="submit" disabled={isLoading}>
              Sign Up
            </SignupButton>
            <GoogleSignupButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              startIcon={<FcGoogle style={{ width: "25px", height: "25px" }} />}
            >
              Sign up with Google
            </GoogleSignupButton>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </ButtonSection>
        </Form>
      </FullpageWrapper>
      <Background img={SignupBg}></Background>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const FullpageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem 3rem;
  max-width: 1200px;
  & > * {
    margin: 0 0 2rem;
  }
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Form = styled.form`
  flex: 1;
  & > * {
    margin: 2rem 0;
  }
`;

const Section = styled.div`
  display: flex;
  height: 65px;
  flex: 1;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;

  a {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const ButtonSection = styled(Section)`
  height: auto;
  margin-top: 3rem;
`;

const InputLabel = styled.label`
  color: ${({ theme: { colors } }) => colors.main};
  margin-left: 1rem;
  margin-bottom: 0.3rem;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: ${({ theme: { colors }, isErrorActive }) =>
    isErrorActive
      ? `2px solid ${colors.error}`
      : `1px solid ${colors.disabled}`};
  border-radius: 5px;

  &:hover {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive ? `2px solid ${colors.error}` : `1px solid black`};
  }
  &:focus {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive ? `2px solid ${colors.error}` : `2px solid ${colors.main}`};
  }
`;

const SignupButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  fontSize: "14px",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginBottom: "1rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

const GoogleSignupButton = muiStyled(SignupButton)({
  background: "white",
  color: Theme.colors.main,
  border: `1px solid ${Theme.colors.disabled}`,
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#ebebeb",
  },
});

const Title = styled.h1`
  color: ${({ theme: { colors } }) => colors.main};
  font-family: "Nunito";
  font-weight: lighter;
  font-size: 36px;
  margin-bottom: -10px;
  text-align: left;
  margin-left: 1rem;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: -0.3rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
  font-weight: 800;
  font-size: 30px;
  color: ${({ theme: { colors } }) => colors.main};
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Background = styled.div`
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: left;
  flex: 2;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ErrorLabel = styled.p`
  color: ${({ theme: { colors } }) => colors.error};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Signup;
