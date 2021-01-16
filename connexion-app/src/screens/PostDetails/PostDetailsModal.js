import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import QuillEditor from "../../components/QuillEditor";
import Theme from "../../Theme";
import * as actApp from "../../store/App/ac-App";
import { useAuth } from "../../AuthContext";
import { showSnackbar } from "../../utils";
import "./PostDetailsModal.css";

import ReactModal from "react-modal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { styled as muiStyled } from "@material-ui/styles";
import { MdClose } from "react-icons/md";

const PostDetailsModal = (props) => {
  const { postId, setComments } = props;
  const [postCommentPressed, setPostCommentPressed] = useState(false);
  const [commentError, setCommentError] = useState("");

  const { addPostComment, fetchPostComments, currentUser } = useAuth();

  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.App.isModalOpen);

  const reloadComments = async () => {
    const fetchedComments = await fetchPostComments(postId);
    setComments(fetchedComments);
    console.log("Comments fetched -> ", fetchedComments);
  };

  const getEditorText = async (body, bodyPlainText) => {
    // FIXME: After submitting the comment, this function will rerun again
    // after closing the modal due to re-rendering. This can result in double comments submitted
    // For now the solution is to perform a isOpen check before proceeding.
    if (!isOpen) return;
    bodyPlainText = bodyPlainText.trim();
    if (bodyPlainText.length <= 0) {
      setCommentError("Your comment cannot be empty");
    } else if (bodyPlainText.length > 2000) {
      setCommentError("Your comment cannot exceed 2000 characters");
    } else {
      setCommentError("");
      console.log("Post Id -> ", postId);
      console.log("SUCCESS! SEND TO FIREBASE:");
      console.log("COMMENT BODY: " + body);
      console.log("COMMENT BODY PLAINTEXT: " + bodyPlainText);
      const response = await addPostComment(postId, body, bodyPlainText);
      if (response) {
        closeModal();
        showSnackbar("success", "Comment added successfully");
        reloadComments();
      } else {
        showSnackbar("error", "Failed to add comment");
      }
    }
    setPostCommentPressed(false);
  };

  const closeModal = () => {
    dispatch(actApp.handleState("isModalOpen", false));
  };

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={200}
      ariaHideApp={false}
      className="Modal"
      style={{
        overlay: {
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 999,
        },
      }}
    >
      <ModalHeader>
        <Title>Add new comment</Title>
        <MdClose className="CloseIcon" onClick={closeModal} />
      </ModalHeader>
      <ModalPoster>
        <p>Posting as: </p>
        <Avatar
          className="Avatar"
          src={currentUser ? currentUser.photoURL : null}
          alt="UserProfile"
        />
        <ModalHeaderUsername>
          {currentUser ? currentUser.displayName : ""}
        </ModalHeaderUsername>
      </ModalPoster>
      <div className="FullEditor">
        <QuillEditor
          height="150px"
          submitPressed={postCommentPressed}
          getEditorText={getEditorText}
          placeholder="Enter your comment here"
        />
      </div>
      <div className="LimitedEditor">
        <QuillEditor
          mode="limited"
          height="150px"
          submitPressed={postCommentPressed}
          getEditorText={getEditorText}
          placeholder="Enter your comment here"
        />
      </div>
      <div className="MinimalEditor">
        <QuillEditor
          mode="minimal"
          height="150px"
          submitPressed={postCommentPressed}
          getEditorText={getEditorText}
          placeholder="Enter your comment here"
        />
      </div>
      {commentError.length > 0 && <Error>{commentError}</Error>}
      <ButtonContainer>
        <PostCommentButton
          className="PostComment"
          style={{ marginTop: commentError ? "3px" : "95px" }}
          onClick={() => setPostCommentPressed(true)}
        >
          Post your comment
        </PostCommentButton>
      </ButtonContainer>
    </Modal>
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
  @media (max-width: 400px) {
    margin-bottom: 2rem;
  }
`;

const Modal = styled(ReactModal)`
  .FullEditor {
    display: flex;
  }
  .LimitedEditor {
    display: none;
  }
  .MinimalEditor {
    display: none;
  }
  @media (max-width: 768px) {
    .FullEditor {
      display: none;
    }
    .LimitedEditor {
      display: flex;
    }
  }
  @media (max-width: 400px) {
    .LimitedEditor {
      display: none;
    }
    .MinimalEditor {
      display: flex;
    }
  }
`;

const Title = styled.div`
  font-family: "RalewayBold";
  font-size: 24px;
  @media (max-width: 400px) {
    font-size: 20px;
  }
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
  @media (max-width: 400px) {
    display: none;
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
