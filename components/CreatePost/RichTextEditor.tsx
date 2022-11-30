import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

interface IProps {
    postCaptionInput: string
    setPostCaptionInput: React.Dispatch<React.SetStateAction<string>>
}

const RichTextEditor = ({postCaptionInput, setPostCaptionInput}:IProps) => {
    const ReactQuill = dynamic(import('react-quill'), { ssr: false })
    const editorRef = useRef(null);
    const [caption, setCaption] = useState<string>("")
  
    console.log(postCaptionInput);
  
  
    return (
      <div className="w-full h-full flex justify-center items-start">
        <ReactQuill
          theme="snow"
          value={caption}
          onChange={setCaption}
          modules={modules}
          ref={editorRef}
          className="w-[90%] h-[80%]"
        />
      </div>
    );
  }
  

export default RichTextEditor