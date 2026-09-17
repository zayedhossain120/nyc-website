"use client";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "@/app/admin/quill-dark.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const DescriptionEditor = ({
  setContent,
  content,
}: {
  setContent: (value: string) => void;
  content: string;
}) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ header: 1 }, { header: 2 }, { header: 3 }],
      [{ align: [] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["link", "code-block", "blockquote"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "color",
    "background",
    "link",
  ];

  return (
    <ReactQuill
      className="w-full overflow-hidden rounded-xl border border-strong pb-20 text-primary md:pb-10"
      value={content}
      onChange={setContent}
      formats={formats}
      modules={modules}
    />
  );
};

export default DescriptionEditor;