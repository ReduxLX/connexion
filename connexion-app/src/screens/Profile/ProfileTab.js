import React, { useState } from "react";
import styled from "styled-components";
import Theme from "../../Theme";
import Post from "../../components/Post/Post";

import { Tab, Tabs } from "@material-ui/core";
import { AppBar } from "@material-ui/core";

const ProfileTab = (props) => {
  const { userPosts, bookmarkedPosts } = props;

  const [focusedTab, setFocusedTab] = useState("1");

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div
        style={{ marginTop: "1rem" }}
        role="tabpanel"
        hidden={value !== index}
        id={`tab_${index}`}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  const handleChange = (event, newValue) => {
    setFocusedTab(newValue);
  };

  const tabLabel1 = `Posts (${userPosts.length} Posts)`;
  const tabLabel2 = "Bookmarks (23 Bookmarks)";

  const renderPosts = (posts) => {
    return posts.map(
      ({
        id,
        postIndex,
        title,
        body,
        bodyPlain,
        categories,
        comments,
        realRating,
        displayName,
        photoURL,
        timestamp,
        university,
        upvotedUsers,
        downvotedUsers,
        startUpvoted,
        startDownvoted,
        hasUpvoted,
        hasDownvoted,
      }) => (
        <div style={{ marginBottom: "1.5rem" }} key={id}>
          <Post
            showRating={false}
            postId={id}
            postIndex={postIndex}
            title={title}
            body={body}
            bodyPlain={bodyPlain}
            displayName={displayName}
            comments={comments}
            university={university}
            initialRating={realRating}
            rating={realRating}
            categories={categories}
            timestamp={timestamp}
            upvotedUsers={upvotedUsers}
            downvotedUsers={downvotedUsers}
            photoURL={photoURL}
            startUpvoted={startUpvoted}
            startDownvoted={startDownvoted}
            hasUpvoted={hasUpvoted}
            hasDownvoted={hasDownvoted}
          />
        </div>
      )
    );
  };

  return (
    <TabWrapper>
      <AppBar className="AppBar" position="static">
        <Tabs
          className="Tabs"
          TabIndicatorProps={{
            style: {
              display: "flex",
              backgroundColor: "transparent",
              justifyContent: "center",
            },
            children: <TabIndicator />,
          }}
          value={focusedTab}
          onChange={handleChange}
        >
          <Tab
            className="Tab"
            style={{
              color:
                focusedTab === "1" ? Theme.colors.main : Theme.colors.disabled,
            }}
            label={<TabLabel>{tabLabel1}</TabLabel>}
            value="1"
            id="tab_1"
            disableRipple
          />
          <Tab
            className="Tab"
            style={{
              color:
                focusedTab === "2" ? Theme.colors.main : Theme.colors.disabled,
            }}
            label={<TabLabel>{tabLabel2}</TabLabel>}
            value="2"
            id="tab_2"
            disableRipple
          />
        </Tabs>
      </AppBar>
      <TabPanel value={focusedTab} index="1">
        {renderPosts(userPosts)}
      </TabPanel>
      <TabPanel value={focusedTab} index="2">
        {renderPosts(bookmarkedPosts)}
      </TabPanel>
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  margin-top: 2rem;
  .AppBar {
    box-shadow: 0 0;
    background-color: white;
    color: ${({ theme: { colors } }) => colors.main};
  }
  .Tab {
    margin-left: -2vw;
    @media (max-width: 768px) {
      margin-left: -5vw;
    }
    @media (max-width: 599px) {
      margin-left: -2vw;
    }
  }
`;

const TabIndicator = styled.span`
  width: 40px;
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.main};
`;

const TabLabel = styled.p`
  text-transform: none;
  font-size: 14px;
  margin-bottom: -15px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export default ProfileTab;
