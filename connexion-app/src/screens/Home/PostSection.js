import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Post from "../../components/Post/Post";
import Theme from "../../Theme";
import * as actHome from "./ac-Home";
import { useAuth } from "../../AuthContext";
import PostSkeleton from "../../components/Post/PostSkeleton";

const PostSection = ({ category = "Home" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const posts = useSelector((state) => state.Home.posts);
  const sortPostsBy = useSelector((state) => state.Home.sortPostsBy);
  const isFetchingPosts = useSelector((state) => state.Home.isFetchingPosts);
  const cachedCategory = useSelector((state) => state.Home.cachedCategory);
  const { fetchAllPosts } = useAuth();

  useEffect(() => {
    if (posts.length <= 0 || cachedCategory !== category) {
      fetchAllPosts(sortPostsBy, category);
    }
  }, [sortPostsBy, category]);

  const labelColor = () => {
    if (category === "General") return "#F85F73";
    if (category === "Future Monashians") return "#FFC700";
    else if (category === "Freshmen") return "#14D3A6";
    else if (category === "Seniors") return "#3EC1D3";
    else if (category === "After Monash") return "#AA96DA";
    else return Theme.colors.disabled;
  };

  const calculateRating = (upvotedArray, downvotedArray) => {
    if (Array.isArray(upvotedArray) && Array.isArray(downvotedArray)) {
      return upvotedArray.length - downvotedArray.length;
    }
    return 0;
  };

  // Index and filter posts based on search query
  const filterPosts = () => {
    let indexedPosts = posts.map((post, i) => ({ ...post, postIndex: i }));
    const searchQuery = location.search ? location.search.slice(8) : "";
    if (searchQuery) {
      const regex = new RegExp(searchQuery.toLowerCase(), "g");
      const filteredPosts = indexedPosts.filter((post) => {
        return post.title.toString().toLowerCase().match(regex);
      });
      return filteredPosts;
    }
    return indexedPosts;
  };

  const renderPosts = () => {
    const filteredPosts = filterPosts();
    return filteredPosts.map(
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
      <div>
        {[...Array(num)].map((i, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
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
            fetchAllPosts(e.target.value, category);
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
      <DropdownWrapper labelColor={labelColor()}>
        {renderDropdown()}
        {category !== "Home" && <h1>{category}</h1>}
      </DropdownWrapper>
      <PostWrapper>
        {isFetchingPosts ? renderPostSkeletons(5) : renderPosts()}
      </PostWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  flex: 8;
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

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DropdownWrapper = styled.div`
  display: flex;
  max-width: 720px;
  text-align: left;
  width: 100%;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-family: "RalewayBold";
    font-size: 36px;
    color: ${({ labelColor }) => labelColor};
  }
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
