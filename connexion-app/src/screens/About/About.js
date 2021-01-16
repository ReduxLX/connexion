import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";

const placeholderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tempus, sollicitudin aenean senectus purus nunc. Mi nisi, lectus diam sit arcu. Lacus pellentesque velit feugiat hac convallis. 

Cursus at urna sed imperdiet viverra iaculis augue enim. Amet euismod massa, elementum ipsum mattis neque congue nulla. Ultricies molestie massa purus aliquet. Sit lectus viverra ut ut sed consequat. Purus nisl et, lacus nulla duis. At urna accumsan, ullamcorper at sed. Tincidunt augue tristique urna ultrices ut est. Pharetra malesuada scelerisque est aliquet risus sit lorem vestibulum feugiat. Vitae donec vitae mattis faucibus. Id morbi molestie in lacus ut aliquet. Fringilla morbi rutrum aliquet in ultricies. 

Ultricies enim felis curabitur varius integer egestas. At eu, mauris mollis quis tempor viverra duis venenatis.`;

const About = () => {
  return (
    <PageWrapper>
      <AboutSection>
        <TeamPicture />
        <div>
          <SectionTitle section="AboutUs">About Us</SectionTitle>
          <SectionText section="AboutUs">{placeholderText}</SectionText>
        </div>
      </AboutSection>
      <HowItWorksSection>
        <div>
          <SectionTitle>How It Works</SectionTitle>
          <SectionText>{placeholderText}</SectionText>
        </div>
      </HowItWorksSection>
    </PageWrapper>
  );
};

const AboutSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  text-align: right;
`;

const SectionTitle = styled.p`
  font-family: "RalewayExtraBold";
  font-size: 38px;
  color: ${({ section, theme: { colors } }) =>
    section === "AboutUs" ? colors.main : "white"};
`;

const SectionText = styled.p`
  font-family: "Nunito";
  font-size: 14px;
  white-space: pre-line;
  color: ${({ section, theme: { colors } }) =>
    section === "AboutUs" ? colors.main : "white"};
  margin-top: 1rem;
`;

const TeamPicture = styled.div`
  border: solid;
  border-color: ${({ theme: { colors } }) => colors.disabled_light};
  border-width: 5px;
  width: 2000px;
  height: 250px;
  margin: 2.8rem 5rem 0 13.1rem;
`;

const HowItWorksSection = styled.div`
  display: flex;
  text-align: left;
  margin: 100px -6rem -6rem -6rem;
  padding: 100px 6rem 6rem 6rem;
  background-color: ${({ theme: { colors } }) => colors.main};
`;

export default About;
