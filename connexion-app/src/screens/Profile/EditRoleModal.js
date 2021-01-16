import React, { useState } from "react";
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

const EditRoleModal = () => {
  const [role, setRole] = useState("");
  const { updateRole } = useAuth();
  const dispatch = useDispatch();

  const isRoleModalOpen = useSelector((state) => state.App.isRoleModalOpen);

  const closeModal = () => {
    dispatch(actApp.handleState("isRoleModalOpen", false));
  };

  const handleRoleUpdate = async () => {
    if (role && role.trim() !== "") {
      const response = await updateRole(role);
      if (response) closeModal();
    } else {
      showSnackbar("error", "Please enter a new role");
    }
  };

  return (
    <ReactModal
      isOpen={isRoleModalOpen}
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
          height: "50%",
          maxHeight: "300px",
          maxWidth: "400px",
          padding: "30px",
        },
      }}
    >
      <ModalHeader>
        <Title>Update Role</Title>
        <MdClose className="CloseIcon" onClick={closeModal} />
      </ModalHeader>
      <ModalBody>
        <Input
          id="role"
          type="text"
          name="role"
          placeholder="Enter new role here"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </ModalBody>
      <ButtonContainer>
        <UploadButton
          onClick={() => {
            handleRoleUpdate();
          }}
        >
          Update role
        </UploadButton>
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

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0 1rem 0;
  & > p {
    margin-right: 0.5rem;
  }
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
export default EditRoleModal;
