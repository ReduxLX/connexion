import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Post from "../../components/Post/Post";
import Theme from "../../Theme";
import * as actHome from "./ac-Home";
import { useAuth } from "../../AuthContext";

const PostSection = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Home.posts);
  const sortPostsBy = useSelector((state) => state.Home.sortPostsBy);
  const { fetchAllPosts } = useAuth();

  //!!!!!!!!!REVERSE THIS CHANGE WHEN PUSHING!!!!!!!!!!
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const calculateRating = (upvotedArray, downvotedArray) => {
    if (Array.isArray(upvotedArray) && Array.isArray(downvotedArray)) {
      return upvotedArray.length - downvotedArray.length;
    }
    return 0;
  };
  const renderPosts = () => {
    return posts.map(
      ({
        id,
        title,
        body,
        bodyPlain,
        categories,
        comments,
        displayName,
        photoURL,
        timestamp,
        university,
        upvotedUsers,
        downvotedUsers,
      }) => (
        <div style={{ marginBottom: "1.5rem" }} key={id}>
          <Post
            postId={id}
            title={title}
            body={body}
            bodyPlain={bodyPlain}
            displayName={displayName}
            comments={comments}
            university={university}
            initialRating={calculateRating(upvotedUsers, downvotedUsers)}
            categories={categories}
            timestamp={timestamp}
            upvotedUsers={upvotedUsers}
            downvotedUsers={downvotedUsers}
            photoURL={photoURL}
          />
        </div>
      )
    );
  };

  const renderDropdown = () => {
    return (
      <CustomForm variant="outlined" hiddenLabel={true} size="small">
        <CustomSelect
          id="demo-simple-select-outlined"
          value={sortPostsBy}
          onChange={(e) =>
            dispatch(actHome.handleState("sortPostsBy", e.target.value))
          }
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value="Latest">Latest</MenuItem>
          <MenuItem value="Popular">Popular</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
        </CustomSelect>
      </CustomForm>
    );
  };

  return (
    <SectionWrapper>
      <DropdownWrapper>{renderDropdown()}</DropdownWrapper>
      <div>{renderPosts()}</div>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  flex: 6;
  text-align: left;
  margin-right: 1rem;
  & > * {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`;

const DropdownWrapper = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
`;

const CustomForm = muiStyled(FormControl)({
  minWidth: 120,
  backgroundColor: Theme.colors.form,
  borderRadius: "5px",
});

const CustomSelect = muiStyled(Select)({
  fontWeight: "regular",
  color: Theme.colors.form_input,
});

export default PostSection;
