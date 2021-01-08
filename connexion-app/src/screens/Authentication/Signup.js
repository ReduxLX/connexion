import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import Theme from "../../Theme";
import SignupBg from "../../res/images/Signup.png";

const Signup = () => {
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
          <Title>Create an account</Title>
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
            <SignupButton type="submit">Sign Up</SignupButton>
            <GoogleSignupButton
              type="submit"
              startIcon={<FcGoogle style={{ width: "25px", height: "25px" }} />}
            >
              Sign up with Google
            </GoogleSignupButton>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Section>
        </Form>
      </FullpageWrapper>
      <Background img={SignupBg}></Background>
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
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const InputLabel = styled.label`
  color: ${({ theme: { colors } }) => colors.main};
  margin-left: 1rem;
  margin-bottom: 0.3rem;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.disabled}`};
  border-radius: 5px;

  &:hover {
    border: 1px solid black;
  }
  &:focus {
    border: ${({ theme: { colors } }) => `2px solid ${colors.main}`};
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
  height: 100vh;
  flex: 2;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Signup;
