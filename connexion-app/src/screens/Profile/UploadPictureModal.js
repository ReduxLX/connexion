import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Theme from "../../Theme";
import * as actApp from "../../store/App/ac-App";
import { useAuth } from "../../AuthContext";
import { showSnackbar } from "../../utils";

import ReactModal from "react-modal";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styled as muiStyled } from "@material-ui/styles";
import { MdClose } from "react-icons/md";
import { useDropzone } from "react-dropzone";

const PostDetailsModal = () => {
  const [files, setFiles] = useState([]);
  const { updateProfilePicture } = useAuth();
  const dispatch = useDispatch();

  const isUploadingImage = useSelector((state) => state.App.isUploadingImage);
  const isPictureModalOpen = useSelector(
    (state) => state.App.isPictureModalOpen
  );

  const closeModal = () => {
    dispatch(actApp.handleState("isPictureModalOpen", false));
    setFiles([]);
  };

  const handleProfileUpdate = async () => {
    if (files && files.length === 1) {
      const response = await updateProfilePicture(files[0]);
      if (response) closeModal();
    } else {
      showSnackbar("error", "Please upload an image to submit");
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <CloseButton>
        <MdClose
          style={{ width: "15px", height: "15px" }}
          onClick={() => setFiles([])}
        />
      </CloseButton>
      <ThumbInner>
        <ThumbImg src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <ReactModal
      isOpen={isPictureModalOpen}
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
          width: "70%",
          height: "60%",
          maxHeight: "480px",
          maxWidth: "600px",
          padding: "30px",
        },
      }}
    >
      <ModalHeader>
        <Title>Update profile Picture</Title>
        <MdClose className="CloseIcon" onClick={closeModal} />
      </ModalHeader>
      <ModalBody>
        {files.length > 0 ? (
          <ThumbContainer>{thumbs}</ThumbContainer>
        ) : (
          <UploadProfile {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Now drop them</p>
            ) : (
              <p>Drag new profile picture here</p>
            )}
          </UploadProfile>
        )}
      </ModalBody>
      {isUploadingImage ? (
        <div style={{ margin: "auto" }}>
          <CircularProgress size={35} style={{ color: Theme.colors.main }} />
        </div>
      ) : (
        <ButtonContainer>
          <UploadButton
            onClick={() => {
              handleProfileUpdate();
            }}
          >
            Upload
          </UploadButton>
        </ButtonContainer>
      )}
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

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
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

const UploadProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: ${({ theme: { colors } }) => `3px dashed ${colors.disabled_light}`};
`;

const Title = styled.div`
  font-family: "RalewayBold";
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const UploadButton = muiStyled(Button)({
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

const ThumbContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
`;

const Thumb = styled.div`
  display: inline-flex;
  position: relative;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 150px;
  height: 150px;
  padding: 4;
  box-sizing: "border-box";
  border-radius: 50%;
`;

const CloseButton = styled.div`
  display: flex;
  position: absolute;
  right: -1rem;
  top: -1rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.error};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  &:hover {
    opacity: 0.5;
  }
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export default PostDetailsModal;
