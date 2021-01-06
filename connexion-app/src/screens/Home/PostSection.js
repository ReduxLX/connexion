import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Post from "../../components/Post/Post";
import Theme from "../../Theme";
import * as actHome from "./ac-Home";

const fakePosts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword",
    poster: "Arthur Calahan",
    comments: 100,
    rating: 100000,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia, turpis eu euismod venenatis, nulla magna convallis tortor, eu blandit nibh ante non orci. Nunc sed ante volutpat, suscipit libero sit amet, vestibulum ex. Vestibulum in fringilla augue. Integer ligula enim, scelerisque et maximus id, pellentesque id dui. Vestibulum at mattis massa. Fusce viverra iaculis faucibus. Vestibulum molestie sapien vel mauris varius molestie non sed metus. Duis placerat ac ligula porttitor varius. Cras eu vulputate velit, sit amet gravida mauris. Duis non dictum erat, non semper ligula. Phasellus id sem quis eros tempor accumsan ut ac tellus. Ut dignissim accumsan justo vitae porttitor.",
    poster: "Marius Von Augustus Herr",
    comments: 5,
    rating: 999,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "I am a moderately short post, not too short and not too long, this should not have a read more as it is only two lines long",
    poster: "NaomiEX",
    comments: 5,
    rating: 25,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "This text will fit 2 lines approximately on a desktop monitor, read more should not apply but maybe sometimes it does, well lets find out shall we__________",
    poster: "NaomiEX",
    comments: 5,
    rating: 10,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "This text tests the boundary of when text starts to truncate, read more should pop up when removing/adding 1 character making this a nice edge case. From the looks of things, it seems to only truncate after the third line overflows which is allright ?  ?",
    poster: "NaomiEX",
    comments: 5,
    rating: -10,
  },
];

const PostSection = () => {
  const dispatch = useDispatch();
  const sortPostsBy = useSelector((state) => state.Home.sortPostsBy);

  const renderPosts = () => {
    return fakePosts.map(({ id, title, body, poster, comments, rating }) => (
      <Post
        key={id}
        title={title}
        body={body}
        poster={poster}
        comments={comments}
        initialRating={rating}
      />
    ));
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
