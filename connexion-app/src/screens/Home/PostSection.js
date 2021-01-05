import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Post from "../../components/Post";
import Theme from "../../Theme";
import * as actHome from "./ac-Home";

const fakePosts = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
];

const PostSection = () => {
  const dispatch = useDispatch();
  const sortPostsBy = useSelector((state) => state.Home.sortPostsBy);

  const renderPosts = () => {
    return fakePosts.map(({ id, title, body, poster, comments }) => (
      <Post
        key={id}
        title={title}
        body={body}
        poster={poster}
        comments={comments}
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
`;

const DropdownWrapper = styled.div`
  text-align: left;
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
