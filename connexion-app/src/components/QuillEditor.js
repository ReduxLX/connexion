import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const {
    submitPressed = false,
    getEditorText = () => {},
    placeholder = "Enter your topic here",
    height = "200px",
  } = props;
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
    <ReactQuill
      style={{ height: height }}
      modules={modules}
      placeholder={placeholder}
      onChange={(content, delta, source, editor) => {
        setBodyPlainText(editor.getText().trim());
        setBody(content);
      }}
    />
  );
};
export default QuillEditor;
