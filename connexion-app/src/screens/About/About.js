import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { styled as muiStyled } from "@material-ui/styles";
import TeamImg from "../../res/images/team.jpg";
import { PageWrapper } from "../SharedStyles";

const AboutUsText = `Hello dear viewer, we are a brother-sister team studying at Monash University Malaysia. On the right is myself, Alfons Fernaldy, and on
                      the left is my sister, Michelle Adeline. This project represents our final submission for the Monash Quickhack Hackathon 2021 which
                      was about "Connecting the past present and future". We thought of many solutions to this problem but came to a realization that Monash lacked
                      a truly unified platform where current, past and future students could discuss matters freely. Thus this was how Connexion was born.`;

const HowItWorksText = `In order to connect the past, present and future, our platform needed to cater for the following subcateogries: General, Future Monashians,
                        Freshmen, Seniors and After Monash. When users create a post, they must choose between 1 to 3 categories which correlate to their topic.
                        Users are free to come and read posts but must sign up to post topics, comments and rate. In order to encourage interactivity
                        between participants, we implemented a point system which rewarded points for those that post topics and comments. Each week, top
                        users would be ranked on a leaderboard visible from the home screen. `;

const About = () => {
  return (
    <>
      <PageWrapper>
        <AboutSection>
          <PhoneTitle section="AboutUs">About Us</PhoneTitle>
          <TeamImage
            className="Avatar"
            variant="rounded"
            alt="pic"
            src={TeamImg}
          />
          <div>
            <DesktopTitle section="AboutUs">About Us</DesktopTitle>
            <div>
              <SectionText section="AboutUs">{AboutUsText}</SectionText>
            </div>
          </div>
        </AboutSection>
      </PageWrapper>
      <HowItWorksWrapper>
        <PageWrapper>
          <HowItWorksSection>
            <SectionTitle>How It Works</SectionTitle>
            <SectionText>{HowItWorksText}</SectionText>
          </HowItWorksSection>
        </PageWrapper>
      </HowItWorksWrapper>
    </>
  );
};

const AboutSection = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  text-align: right;
  & > * {
    margin-left: 1rem;
  }
  @media (max-width: 768px) {
    text-align: justify;
    flex-direction: column;
    justify-content: center;
  }
`;

const HowItWorksWrapper = styled.div`
  background-color: ${({ theme: { colors } }) => colors.main};
`;

const HowItWorksSection = styled(AboutSection)`
  flex-direction: column;
  text-align: left;
`;

const SectionTitle = styled.p`
  font-family: "RalewayExtraBold";
  font-size: 38px;
  color: ${({ section, theme: { colors } }) =>
    section === "AboutUs" ? colors.main : "white"};
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const PhoneTitle = styled(SectionTitle)`
  @media (min-width: 768px) {
    display: none;
  }
`;
const DesktopTitle = styled(SectionTitle)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SectionText = styled.p`
  font-family: "Nunito";
  font-size: 18px;
  color: ${({ section, theme: { colors } }) =>
    section === "AboutUs" ? colors.main : "white"};
  margin-top: 1rem;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TeamImage = muiStyled(Avatar)({
  width: "350px",
  height: "250px",
  "@media(max-width:768px)": {
    width: "250px",
    height: "150px",
  },
});

export default About;
