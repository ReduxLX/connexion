import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const QuillText = (props) => {
  const { text } = props;

  return <ReactQuill value={text} readOnly={true} theme={"bubble"} />;
};

export default QuillText;
