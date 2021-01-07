import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import Theme from "../../Theme";
import LoginBg from "../../res/images/Login.png";

const Login = () => {
  const { register, handleSubmit } = useForm();
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
              ref={register()}
            />
          </Section>
          <Section>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="Enter your email address"
              ref={register()}
            />
          </Section>
          <Section>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              ref={register()}
            />
          </Section>
          <Section>
            <LoginButton type="submit">Sign In</LoginButton>
            <GoogleLoginButton
              type="submit"
              startIcon={<FcGoogle style={{ width: "25px", height: "25px" }} />}
            >
              Sign in with Google
            </GoogleLoginButton>
            <p>
              Don't have an account yet? <Link to="/signup">Sign up</Link>
            </p>
          </Section>
        </Form>
      </FullpageWrapper>
      <Background img={LoginBg}></Background>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const FullpageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme: { colors } }) => colors.main};
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
  height: 60px;
  flex: 1;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;
  p {
    color: ${({ theme: { colors } }) => colors.disabled};
  }

  a {
    color: white;
  }
`;

const InputLabel = styled.label`
  color: white;
  margin-left: 1rem;
  margin-bottom: 0.3rem;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 5px;
  background: ${({ theme: { colors } }) => colors.main};
  color: white;
  &:hover {
    border: 1px solid rgb(365, 365, 365, 0.5);
  }
  &:focus {
    border: 2px solid white;
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
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
  font-weight: 800;
  font-size: 20px;
  color: white;
  @media (min-width: 768px) {
    font-size: 30px;
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

export default Login;
