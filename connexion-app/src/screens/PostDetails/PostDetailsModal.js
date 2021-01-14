import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import QuillEditor from "../../components/QuillEditor";
import Theme from "../../Theme";
import * as actApp from "../../store/App/ac-App";

import ReactModal from "react-modal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { styled as muiStyled } from "@material-ui/styles";
import { MdClose } from "react-icons/md";

const PostDetailsModal = (props) => {
  const [postCommentPressed, setPostCommentPressed] = useState(false);
  const [commentError, setCommentError] = useState("");

  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.App.isModalOpen);

  const getEditorText = (body, bodyPlainText) => {
    bodyPlainText = bodyPlainText.trim();
    if (bodyPlainText.length <= 0) {
      setCommentError("Your comment cannot be empty");
    } else if (bodyPlainText.length > 1000) {
      setCommentError("Your comment cannot exceed 1000 characters");
    } else {
      setCommentError("");
      console.log("SUCCESS! SEND TO FIREBASE:");
      console.log("COMMENT BODY: " + body);
      console.log("COMMENT BODY PLAINTEXT: " + bodyPlainText);
      closeModal();
    }
    setPostCommentPressed(false);
  };

  const closeModal = () => {
    dispatch(actApp.handleState("isModalOpen", false));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={{
        overlay: {
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 999,
        },
        content: {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          color: "black",
          backgroundColor: "white",
          borderRadius: "8px",
          margin: "auto",
          width: "50%",
          height: "70%",
          maxHeight: "480px",
          padding: "30px 30px 0 30px",
        },
      }}
    >
      <ModalHeader>
        <Title>Add new comment</Title>
        <MdClose className="CloseIcon" onClick={closeModal} />
      </ModalHeader>
      <ModalPoster>
        <p>Posting as: </p>
        <Avatar className="Avatar" src={ProfileImg1} alt="UserProfile" />
        <ModalHeaderUsername>NaomiEX</ModalHeaderUsername>
      </ModalPoster>
      <QuillEditor
        height="150px"
        submitPressed={postCommentPressed}
        getEditorText={getEditorText}
        placeholder="Enter your comment here"
      />
      {commentError.length > 0 && <Error>{commentError}</Error>}
      <ButtonContainer>
        <PostCommentButton
          className="PostComment"
          style={{ marginTop: commentError ? "3px" : "95px" }}
          commentError={commentError}
          onClick={() => setPostCommentPressed(true)}
        >
          Post your comment
        </PostCommentButton>
      </ButtonContainer>
    </ReactModal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .CloseIcon {
    color: ${({ theme: { colors } }) => colors.disabled};
    width: 22px;
    height: 22px;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

const Title = styled.div`
  font-family: "RalewayBold";
  font-size: 24px;
`;

const ModalPoster = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2.5rem 0 1rem 0;
  & > p {
    margin-right: 0.5rem;
  }
  .Avatar {
    width: 30px;
    height: 30px;
    margin-right: 0.25rem;
  }
`;

const ModalHeaderUsername = styled.p`
  color: ${({ theme: { colors } }) => colors.main};
  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.p`
  margin-top: 70px;
  color: ${({ theme: { colors } }) => colors.error};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PostCommentButton = muiStyled(Button)({
  background: Theme.colors.main,
  fontFamily: "Raleway",
  color: "white",
  textTransform: "none",
  padding: "8px 20px 8px 20px",
  borderRadius: "6px",
  "&:hover": {
    opacity: "0.85",
    backgroundColor: Theme.colors.main,
    color: "white",
  },
});

export default PostDetailsModal;
