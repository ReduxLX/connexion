import React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.bubble.css";

const QuillText = (props) => {
  const { text } = props;

  return (
    <QuillWrapper>
      <ReactQuill value={text} readOnly={true} theme={"bubble"} />
    </QuillWrapper>
  );
};

const QuillWrapper = styled.div`
  & > * > * > * {
    overflow-wrap: anywhere;
  }
`;

export default QuillText;
