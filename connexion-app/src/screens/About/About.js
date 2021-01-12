import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FormControl, Select, Button, MenuItem } from "@material-ui/core";
import { styled as muiStyled } from "@material-ui/styles";
import { PageWrapper } from "../SharedStyles";
import Theme from "../../Theme";
import { useAuth } from "../../AuthContext";
import { fbError } from "../../utils";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { convertSecondsToDate } from "../../utils";

const About = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("FXjGkgHDy2X2qBrSi728");
  const [university, setUniversity] = useState("Global");
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState(false);

  const {
    addPost,
    addPostComment,
    fetchAllPosts,
    fetchPostComments,
    upvotePost,
    downvotePost,
    upvoteComment,
    downvoteComment,
    viewPost,
  } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const posts = await fetchAllPosts();
      setPosts(posts);
      const comments = await fetchPostComments(postId);
      console.log(comments);
    }

    // fetchData()
  }, []);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    console.log("Submit -> ", title, body, university);
    addPost(title, body, university, ["General", "Juniors"]);
  };

  const handleAddComment = () => {
    addPostComment(postId, "Comment body");
  };

  const handleUpvote = () => {
    upvotePost(postId);
  };

  const handleDownvote = () => {
    downvotePost(postId);
  };

  const handleCommentUpvote = () => {
    upvoteComment(postId, commentId);
  };

  const handleCommentDownvote = () => {
    downvoteComment(postId, commentId);
  };

  const handleViewPost = () => {
    viewPost(postId);
  };

  const renderDropdown = () => {
    return (
      <CustomForm variant="outlined" hiddenLabel={true} size="small">
        <CustomSelect
          id="demo-simple-select-outlined"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          <MenuItem value="Global">Global</MenuItem>
          <MenuItem value="Malaysia">Malaysia</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
        </CustomSelect>
      </CustomForm>
    );
  };
  console.log(posts);
  return (
    <PageWrapper>
      <h1>Firebase Playground</h1>
      <ErrorSnackbar
        isErrorVisible={isErrorVisible}
        handleClose={() => setErrorVisible(false)}
        message={error}
        type="fullscreen"
      />
      <TwoColumn>
        <Form onSubmit={handleSubmitPost}>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="body"
            type="text"
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {renderDropdown()}
          <SubmitFirebase type="submit">Submit</SubmitFirebase>
          <hr />
          <Input
            id="postId"
            type="text"
            name="postId"
            placeholder="Enter Post ID here"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <Input
            id="commentId"
            type="text"
            name="commentId"
            placeholder="Enter Comment ID here"
            value={commentId}
            onChange={(e) => setCommentId(e.target.value)}
          />
          <SubmitFirebase onClick={handleUpvote}>
            Upvote Post {postId}
          </SubmitFirebase>
          <SubmitFirebase onClick={handleDownvote}>
            Downvote Post {postId}
          </SubmitFirebase>
          <SubmitFirebase onClick={handleViewPost}>
            View Post {postId}
          </SubmitFirebase>
          <SubmitFirebase onClick={handleAddComment}>
            Add Comment in Post {postId}
          </SubmitFirebase>
          <SubmitFirebase onClick={handleCommentUpvote}>
            Upvote Comment {commentId} in Post {postId}
          </SubmitFirebase>
          <SubmitFirebase onClick={handleCommentDownvote}>
            Downvote Comment {commentId} in Post {postId}
          </SubmitFirebase>
        </Form>
        <PostContainer>
          {posts.map(
            ({
              id,
              title,
              body,
              university,
              views,
              rating,
              timestamp: { seconds },
            }) => (
              <div key={id}>
                <strong>Title: {title}</strong>
                <p>id: {id}</p>
                <p>Body: {body}</p>
                <p>University: {university}</p>
                <p>Views: {views}</p>
                <p>Rating: {rating}</p>
                <p>Posted on: {convertSecondsToDate(seconds)}</p>
                <br />
              </div>
            )
          )}
        </PostContainer>
      </TwoColumn>
    </PageWrapper>
  );
};

const TwoColumn = styled.div`
  display: flex;
  & > * {
    margin-left: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex: 1;
  max-width: 500px;
  flex-direction: column;
  & > * {
    margin-bottom: 1rem;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const CustomForm = muiStyled(FormControl)({
  minWidth: 120,
  backgroundColor: Theme.colors.form,
  borderRadius: "5px",
});

const CustomSelect = muiStyled(Select)({
  fontWeight: "regular",
  color: Theme.colors.form_input,
});

const SubmitFirebase = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  fontSize: "14px",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

export default About;
