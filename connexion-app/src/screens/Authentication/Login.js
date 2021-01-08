import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import Theme from "../../Theme";
import LoginBg from "../../res/images/Login.png";
import { email_regex } from "../../utils/constants";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <FullpageWrapper>
        <Link to="/">
          <LogoWrapper>CONNEXION</LogoWrapper>
        </Link>
        <Form
          onSubmit={handleSubmit((formData) => {
            console.log(formData);
          })}
        >
          <Title>Sign in</Title>
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
          <ButtonSection>
            <LoginButton type="submit">Sign In</LoginButton>
            <GoogleLoginButton
              type="submit"
              startIcon={<FcGoogle style={{ width: "25px", height: "25px" }} />}
            >
              Sign in with Google
            </GoogleLoginButton>
            <p style={{ color: "white" }}>
              Don't have an account yet? <Link to="/signup">Sign up</Link>
            </p>
          </ButtonSection>
        </Form>
      </FullpageWrapper>
      <Background img={LoginBg}></Background>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const FullpageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  background: ${({ theme: { colors } }) => colors.main};
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
    color: white;
  }
`;

const ButtonSection = styled(Section)`
  height: auto;
  margin-top: 3rem;
`;

const InputLabel = styled.label`
  color: white;
  margin-left: 1rem;
  margin-bottom: 0.3rem;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: ${({ theme: { colors }, isErrorActive }) =>
    isErrorActive ? `2px solid ${colors.warning}` : `1px solid white`};
  border-radius: 5px;
  background: ${({ theme: { colors } }) => colors.main};
  color: white;
  &:hover {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive
        ? `2px solid ${colors.warning}`
        : `1px solid rgb(365, 365, 365, 0.5)`};
  }
  &:focus {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive ? `2px solid ${colors.warning}` : `2px solid white`};
  }
  &::placeholder {
    color: rgb(365, 365, 365, 0.5);
  }
`;

const LoginButton = muiStyled(Button)({
  background: "white",
  color: Theme.colors.main,
  fontSize: "14px",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginBottom: "1rem",
  "&:hover": {
    backgroundColor: "white",
  },
});

const GoogleLoginButton = muiStyled(LoginButton)({
  background: "transparent",
  color: "white",
  border: `1px solid white`,
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const Title = styled.h1`
  color: white;
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
  color: white;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Background = styled.div`
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: left;
  height: 100vh;
  flex: 2;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ErrorLabel = styled.p`
  color: ${({ theme: { colors } }) => colors.warning};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Login;
