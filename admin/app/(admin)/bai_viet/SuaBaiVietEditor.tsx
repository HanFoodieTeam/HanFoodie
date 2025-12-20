"use client";

import dynamic from "next/dynamic";

interface Props {
  value: string;
  onChange: (content: string) => void;
}

// Dynamic import TinyMCE editor, chỉ render trên client
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function SuaBaiVietEditor({ value, onChange }: Props) {
  return (
    <div className="border p-2 rounded w-full">
      <Editor
        apiKey="b0ltf47z16t202dzee5j66umb4r9m5ypez273jxv802r6t8n" // hoặc key TinyMCE của bạn
        value={value}
        onEditorChange={onChange}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "visualblocks",
            "fullscreen",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | removeformat",
          branding: false,
          content_style: "body { font-family:Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
