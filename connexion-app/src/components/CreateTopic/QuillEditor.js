import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const { submitPressed, getEditorText = () => {} } = props;
  const [body, setBody] = useState("");
  const [bodyPlainText, setBodyPlainText] = useState("");

  useEffect(() => {
    if (submitPressed) {
      getEditorText(body, bodyPlainText);
    }
  }, [submitPressed, body, bodyPlainText, getEditorText]);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  return (
    <QuillWrapper>
      <ReactQuill
        modules={modules}
        placeholder={"Enter your topic here"}
        onChange={(content, delta, source, editor) => {
          setBodyPlainText(editor.getText().trim());
          setBody(content);
        }}
      />
    </QuillWrapper>
  );
};

const QuillWrapper = styled.div`
  & > * {
    height: 200px;
  }
`;

export default QuillEditor;
