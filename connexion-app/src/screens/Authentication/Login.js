import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import Theme from "../../Theme";
import LoginBg from "../../res/images/Login.png";
import Sign_In_BG from "../../res/images/Sign_In_BG.svg";
import { email_regex } from "../../utils/constants";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const isLoading = useSelector((state) => state.App.isLoading);

  const { register, handleSubmit, errors } = useForm();
  const { login, signinGoogle } = useAuth();

  const handleEmailPasswordLogin = async (formData) => {
    const { email, password } = formData;
    await login(email, password);
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
        <Form onSubmit={handleSubmit(handleEmailPasswordLogin)}>
          <Title>Sign in</Title>
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
            <LoginButton type="submit" disabled={isLoading}>
              <p style={{ fontSize: "15px" }}>Sign In</p>
            </LoginButton>
            <GoogleLoginButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              startIcon={<FcGoogle style={{ width: "25px", height: "25px" }} />}
            >
              <p style={{ fontSize: "15px" }}>Sign in with Google</p>
            </GoogleLoginButton>
            <SwitchPageTextWrapper>
              <p style={{ color: "white" }}>Don't have an account yet?</p>
              <Link className="SignUp" to="/signup">
                Sign up
              </Link>
            </SwitchPageTextWrapper>
          </ButtonSection>
        </Form>
      </FullpageWrapper>
      <Background img={Sign_In_BG}>
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
  background: ${({ theme: { colors } }) => colors.main};
  padding: 1.5rem 5rem 0 5rem;
  max-width: 1200px;
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Form = styled.form`
  max-width: 80vw;
  flex: 1;
  margin-top: 2rem;
  & > * {
    margin: 2rem 0;
  }
`;

const Section = styled.div`
  display: flex;
  height: 45px;
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
  font-family: "NunitoSemiBold";
  font-size: 13px;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: ${({ theme: { colors }, isErrorActive }) =>
    isErrorActive ? `2px solid ${colors.warning}` : `1px solid white`};
  border-radius: 2.5px;
  font-size: 13px;
  background: ${({ theme: { colors } }) => colors.main};
  color: white;
  &:hover {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive
        ? `2px solid ${colors.warning}`
        : `1px solid rgb(255, 255, 255, 0.8)`};
  }
  &:focus {
    border: ${({ theme: { colors }, isErrorActive }) =>
      isErrorActive ? `2px solid ${colors.warning}` : `1px solid white`};
  }
  &::placeholder {
    color: rgb(255, 255, 255, 0.8);
  }
`;

const LoginButton = muiStyled(Button)({
  background: "white",
  color: Theme.colors.main,
  textTransform: "none",
  padding: "0.5rem 0.8rem",
  marginBottom: "0.5rem",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const GoogleLoginButton = muiStyled(LoginButton)({
  background: "transparent",
  color: "white",
  border: `1px solid white`,
  borderRadius: "5px",
  "&:hover": {
    border: `1px solid rgba(255,255,255,0.8)`,
    background: "transparent",
  },
});

const Title = styled.h1`
  color: white;
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
  color: white;
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
  color: ${({ theme: { colors } }) => colors.main};
  font-size: 32px;
  @media (max-width: 1000px) {
    font-size: 23px;
  }
`;

const ErrorLabel = styled.p`
  color: ${({ theme: { colors } }) => colors.warning};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SwitchPageTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  p {
    font-size: 12px;
    color: "white";
    margin-right: 2px;
  }
  .SignUp {
    font-size: 12px;
    text-decoration: underline;
    opacity: 1;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export default Login;
