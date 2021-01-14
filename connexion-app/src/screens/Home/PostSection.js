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
import PostSkeleton from "../../components/Post/PostSkeleton";

const PostSection = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Home.posts);
  const sortPostsBy = useSelector((state) => state.Home.sortPostsBy);
  const isFetchingPosts = useSelector((state) => state.Home.isFetchingPosts);
  const { fetchAllPosts } = useAuth();

  //!!!!!!!!!REVERSE THIS CHANGE WHEN PUSHING!!!!!!!!!!
  useEffect(() => {
    if (posts.length <= 0) fetchAllPosts(sortPostsBy);
  }, [sortPostsBy]);

  const calculateRating = (upvotedArray, downvotedArray) => {
    if (Array.isArray(upvotedArray) && Array.isArray(downvotedArray)) {
      return upvotedArray.length - downvotedArray.length;
    }
    return 0;
  };
  const renderPosts = () => {
    return posts.map(
      (
        {
          id,
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
        },
        postIndex
      ) => (
        <div style={{ marginBottom: "1.5rem" }} key={id}>
          <Post
            postId={id}
            postIndex={postIndex}
            title={title}
            body={body}
            bodyPlain={bodyPlain}
            displayName={displayName}
            comments={comments}
            university={university}
            initialRating={calculateRating(upvotedUsers, downvotedUsers)}
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

  const renderPostSkeletons = (num) => {
    return (
      <SkeletonGroup>
        {[...Array(num)].map((i, index) => (
          <PostSkeleton key={index} />
        ))}
      </SkeletonGroup>
    );
  };

  const renderDropdown = () => {
    return (
      <CustomForm variant="outlined" hiddenLabel={true} size="small">
        <CustomSelect
          id="demo-simple-select-outlined"
          value={sortPostsBy}
          onChange={(e) => {
            dispatch(actHome.handleState("sortPostsBy", e.target.value));
            fetchAllPosts(e.target.value);
          }}
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
      <div>{isFetchingPosts ? renderPostSkeletons(5) : renderPosts()}</div>
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

const SkeletonGroup = styled.div`
  flex-direction: "column";
  justify-content: "flex-start";
  flex: 1;
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
