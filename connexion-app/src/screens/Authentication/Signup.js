import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import { email_regex } from "../../utils/constants";
import SignupBg from "../../res/images/Signup.png";
import Sign_Up_BG from "../../res/images/Sign_Up_BG.svg";
import Theme from "../../Theme";
import { useAuth } from "../../AuthContext";

const Signup = () => {
  const isLoading = useSelector((state) => state.App.isLoading);

  const { register, watch, handleSubmit, errors } = useForm();
  const { signup, signinGoogle } = useAuth();
  const watchPassword = watch("password", "");

  const handleEmailPasswordSignup = async (formData) => {
    const { username, email, password } = formData;
    await signup(username, email, password);
  };

  const handleGoogleLogin = async () => {
    await signinGoogle();
  };

  return (
    <Wrapper>
      <FullpageWrapper>
        <Link to="/">
          <LogoWrapper>CONNEXION</LogoWrapper>
        </Link>
        <Form onSubmit={handleSubmit(handleEmailPasswordSignup)}>
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
            <InputLabel htmlFor="email">Email address</InputLabel>
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
            {isLoading ? (
              <div style={{ margin: "auto" }}>
                <CircularProgress
                  size={35}
                  style={{ color: Theme.colors.main }}
                />
              </div>
            ) : (
              <>
                <SignupButton type="submit" disabled={isLoading}>
                  <p style={{ fontSize: "15px" }}>Sign up</p>
                </SignupButton>
                <GoogleSignupButton
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  startIcon={
                    <FcGoogle style={{ width: "25px", height: "25px" }} />
                  }
                >
                  <p style={{ fontSize: "15px" }}>Sign up with Google</p>
                </GoogleSignupButton>
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </>
            )}
          </ButtonSection>
        </Form>
      </FullpageWrapper>
      <Background img={Sign_Up_BG}>
        <BackgroundTextWrapper>
          <BackgroundText>CONNECT WITH THE PAST,</BackgroundText>
          <BackgroundText>PRESENT, AND FUTURE</BackgroundText>
        </BackgroundTextWrapper>
      </Background>
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
  flex: 9;
  padding: 1.5rem 5rem 0 5rem;
  max-width: 1200px;
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Form = styled.form`
  max-width: 80vw;
  & > * {
    margin: 1rem 0 1rem 0;
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
  margin-top: 1.5rem;
`;

const InputLabel = styled.label`
  color: ${({ theme: { colors } }) => colors.main};
  margin-left: 1rem;
  margin-bottom: 0.3rem;
  font-family: "NunitoSemiBold";
  font-size: 13px;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: ${({ theme: { colors }, isErrorActive }) =>
    isErrorActive
      ? `2px solid ${colors.error}`
      : `1px solid ${colors.disabled_light}`};
  border-radius: 2.5px;
  font-size: 13px;
  &:hover {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive
        ? `2px solid ${colors.error}`
        : `1px solid ${colors.disabled}`};
  }
  &:focus {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive ? `2px solid ${colors.error}` : `1px solid ${colors.main}`};
  }
`;

const SignupButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  textTransform: "none",
  padding: "0.5rem 0.8rem",
  marginBottom: "0.5rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

const GoogleSignupButton = muiStyled(SignupButton)({
  background: "white",
  color: Theme.colors.main,
  border: `1px solid ${Theme.colors.disabled}`,
  fontSize: "12px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#fafafa",
  },
});

const Title = styled.h1`
  color: ${({ theme: { colors } }) => colors.main};
  font-family: "RalewayLight";
  font-size: 32px;
  margin-bottom: 1.5rem;
  text-align: left;
  margin-left: 0.8rem;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: -0.3rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "RalewayExtraBold";
  margin-left: 1rem;
  margin-bottom: 2rem;
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.main};
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Background = styled.div`
  display: flex;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: left;
  flex: 20;
  @media (max-width: 768px) {
    display: none;
  }
`;

const BackgroundTextWrapper = styled.div`
  margin-left: 60px;
  margin-top: 30.6rem;
  @media (max-width: 1000px) {
    margin-top: 31rem;
  }
  @media (max-width: 850px) {
    margin-left: 30px;
  }
`;

const BackgroundText = styled.p`
  font-family: "RalewayLight";
  margin-bottom: 0.5rem;
  color: white;
  font-size: 32px;
  @media (max-width: 1000px) {
    font-size: 23px;
  }
`;

const ErrorLabel = styled.p`
  color: ${({ theme: { colors } }) => colors.error};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SwitchPageTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  p {
    font-size: 12px;
    color: ${({ theme: { colors } }) => colors.disabled};
    margin-right: 2px;
  }
  .SignIn {
    font-size: 12px;
    text-decoration: underline;
  }
`;

export default Signup;
