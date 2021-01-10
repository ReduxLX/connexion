import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import DiscussionSection from "../Home/DiscussionSection";

const CreateTopic = () => {
  return (
    <PageWrapper>
      <CreateTopicWrapper>
        <DiscussionSection />
      </CreateTopicWrapper>
    </PageWrapper>
  );
};

const CreateTopicWrapper = styled.div`
  display: flex;
`;

export default CreateTopic;
