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

  const tabLabel1 = "Posts (18 Posts)";
  const tabLabel2 = "Bookmarks (23 Bookmarks)";

  const renderPosts = (posts) => {
    return posts.map(({ id, title, body, poster, comments, rating }) => (
      <div key={id} style={{ marginTop: "30px" }}>
        <Post
          title={title}
          body={body}
          poster={poster}
          comments={comments}
          initialRating={rating}
          showRating={false}
        />
      </div>
    ));
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
            style={{
              textTransform: "none",
              marginLeft: "-25px",
              color:
                focusedTab === "1" ? Theme.colors.main : Theme.colors.disabled,
            }}
            label={
              <p
                style={{
                  fontSize: "14px",
                  marginBottom: "-15px",
                }}
              >
                {tabLabel1}
              </p>
            }
            value="1"
            id="tab_1"
            disableRipple
          />
          <Tab
            style={{
              textTransform: "none",
              marginLeft: "-15px",
              color:
                focusedTab === "2" ? Theme.colors.main : Theme.colors.disabled,
            }}
            label={
              <p style={{ fontSize: "14px", marginBottom: "-15px" }}>
                {tabLabel2}
              </p>
            }
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
`;

const TabIndicator = styled.span`
  width: 40px;
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.main};
`;

export default ProfileTab;
