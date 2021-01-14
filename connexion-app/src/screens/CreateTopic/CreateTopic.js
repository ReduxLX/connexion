import React, { useState } from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import ChooseCategory from "../../components/CreateTopic/ChooseCategory";
import Categories from "../../Categories";
import Theme from "../../Theme";
import QuillEditor from "../../components/QuillEditor";
import { useAuth } from "../../AuthContext";

import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { styled as muiStyled } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";

const CreateTopic = () => {
  const { register, handleSubmit, errors } = useForm();

  const [body, setBody] = useState("");
  const [bodyPlainText, setBodyPlainText] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [university, setUniversity] = useState("Global");
  const [categories, setCategories] = useState([]);
  const [submitPressed, setSubmitPressed] = useState(false);

  const { addPost } = useAuth();
  const history = useHistory();

  // var doc = new DOMParser().parseFromString(body, "text/html");

  // const JustTesting = (string) => {
  //   return { __html: string };
  // };

  // const JustATest = (string) => {
  //   return <div dangerouslySetInnerHTML={JustTesting(string)} />;
  // };

  //JustATest(doc.firstChild.innerHTML)

  const changeCategoriesSelected = (categoryName, operation) => {
    if (operation === "add") {
      if (categoryError) {
        setCategoryError("");
      }
      let newCategories = categories.concat(categoryName);
      setCategories(newCategories);
    } else if (operation === "remove") {
      var newCategories = categories.filter((cat) => cat !== categoryName);
      setCategories(newCategories);
    }
  };

  const DisplayCategories = () => {
    return Categories.map(({ name, description }) => {
      return (
        <ChooseCategory
          key={name}
          name={name}
          description={description}
          disabled={categories.length < 3 ? false : true}
          onSelect={changeCategoriesSelected}
        />
      );
    });
  };

  const onSubmit = async (formData) => {
    if (checkBodyAndCategory()) {
      console.log("Everything valid, submit data to firebase");
      console.log("TITLE: " + formData.title);
      console.log("BODY: " + body);
      console.log("BODY PLAIN TEXT: " + bodyPlainText);
      console.log("UNIVERSITY: " + university);
      console.log("CATEGORIES: ", categories);
      const res = await addPost(
        formData.title,
        body,
        bodyPlainText,
        university,
        categories
      );
      if (res) history.push("/");
    }
  };

  const getEditorText = (text, plainText) => {
    setBody(text);
    setBodyPlainText(plainText);
    setSubmitPressed(false);
  };

  const checkBodyAndCategory = () => {
    let valid = true;
    if (bodyPlainText.length <= 0) {
      valid = false;
      setBodyError("Your post cannot be empty");
    } else if (bodyPlainText.length > 2000) {
      valid = false;
      setBodyError("Your post can have a maximum of 2000 characters");
    } else {
      setBodyError("");
    }

    if (categories.length <= 0) {
      valid = false;
      setCategoryError("You must choose at least one category");
    } else {
      setCategoryError("");
    }
    return valid;
  };

  return (
    <PageWrapper>
      <CreateTopicWrapper>
        <Title>Ask the Monash Community</Title>
        <Subtitle>
          Do you have a question, discussion topic, or issue that you wish to
          share with the community? Use the form below to connect with your
          fellow Monashians!
        </Subtitle>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <SectionWrapper>
            <SectionTitle>Title</SectionTitle>
            <SectionSubtitle>
              Be specific and try to be concise!
            </SectionSubtitle>
            <TitleInput
              id="title"
              name="title"
              isErrorActive={errors.title}
              ref={register({
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be more than 5 characters",
                },
              })}
              maxLength={100}
              placeholder={"e.g. What do you guys think of unit X?"}
            />
            <SectionError>
              {errors.title ? errors.title.message : null}
            </SectionError>
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle>Body</SectionTitle>
            <SectionSubtitle>
              Include all relevant information someone would need to know in
              order to answer your question / participate in the discussion
            </SectionSubtitle>
            <QuillEditor
              submitPressed={submitPressed}
              getEditorText={getEditorText}
            />
            <SectionError className="BodyError">{bodyError}</SectionError>
          </SectionWrapper>
          <div style={{ marginTop: "4.5rem" }}>
            <SectionTitle>University</SectionTitle>
            <SectionSubtitle>
              Choose the appropriate Monash University or Universities that the
              topic relates to:
            </SectionSubtitle>
            <CustomForm variant="outlined" hiddenLabel={true} size="small">
              <CustomSelect
                id="chooseUniversity"
                name="chooseUniversity"
                ref={register}
                value={university}
                onChange={(event) => setUniversity(event.target.value)}
              >
                <MenuItem value="Global">Global</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Malaysia">Malaysia</MenuItem>
              </CustomSelect>
            </CustomForm>
          </div>
          <SectionWrapper>
            <SectionTitle>Categories</SectionTitle>
            <SectionSubtitle>
              Choose up to 3 categories that apply to your post
            </SectionSubtitle>
            {DisplayCategories()}
          </SectionWrapper>
          <SectionError>{categoryError}</SectionError>
          <CreatePostButton
            onClick={() => {
              setSubmitPressed(true);
              checkBodyAndCategory();
            }}
            type="submit"
          >
            Create Post
          </CreatePostButton>
        </form>
      </CreateTopicWrapper>
    </PageWrapper>
  );
};

const CreateTopicWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 7.2rem 0 12.2rem;
  * {
    font-size: 14px;
    text-align: left;
  }
  @media (max-width: 1200px) {
    margin: 0 7rem 0 7rem;
  }
  @media (max-width: 768px) {
    margin: 0 2rem 0 2rem;
  }
`;

const Title = styled.h1`
  font-family: "RalewayBold";
  font-size: 36px;
  color: ${({ theme: { colors } }) => colors.main};
`;

const Subtitle = styled.p`
  font-family: "Raleway";
  font-size: 18px;
  margin-top: 0.8rem;
`;

const SectionWrapper = styled.div`
  margin-top: 2.2rem;
  .Editor {
    height: 200px;
  }
  .BodyError {
    margin-top: 3rem;
  }
`;

const SectionTitle = styled.h1`
  font-family: "RalewayLight";
  font-size: 18px;
  color: ${({ theme: { colors } }) => colors.main};
`;

const SectionSubtitle = styled.p`
  margin: 0.4rem 0 0.6rem;
  color: ${({ theme: { colors } }) => colors.secondary};
`;

const SectionError = styled.p`
  color: ${({ theme: { colors } }) => colors.error};
`;

const TitleInput = styled.input`
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 1px;
  padding: 10px;
  border-color: ${({ theme: { colors }, isErrorActive }) =>
    isErrorActive ? colors.error : colors.disabled_light};
`;

const CustomForm = muiStyled(FormControl)({
  minWidth: 300,
});

const CustomSelect = muiStyled(Select)({
  fontWeight: "regular",
  fontFamily: "Nunito",
  color: "black",
});

const CreatePostButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  padding: "10px 40px",
  textTransform: "none",
  fontFamily: "Nunito",
  marginTop: "2rem",
  "&:hover": {
    backgroundColor: Theme.colors.main_light,
  },
});

export default CreateTopic;
