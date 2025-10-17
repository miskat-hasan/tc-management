"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = forwardRef((_, ref) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }], // Font size
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
            ["bold", "italic", "underline", "strike"], // Formatting
            [{ color: [] }, { background: [] }], // Text color & background
            [{ script: "sub" }, { script: "super" }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ], // Lists & Indent
            [{ direction: "rtl" }], // Text direction
            [{ align: [] }], // Text alignment
            ["link", "image", "video"], // Links & media
            ["blockquote", "code-block"], // Blocks
            ["clean"], // Remove formatting
          ],
        },
        placeholder: "Write something...",
        formats: [
          "font",
          "size",
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "script",
          "list",
          "bullet",
          "indent",
          "direction",
          "align",
          "link",
          "image",
          "video",
          "blockquote",
          "code-block",
        ],
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return "";
    },
  }));

  return <div ref={editorRef} style={{ height: "300px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
