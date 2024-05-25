import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import './ckeditor-tailwind.css'; 

const config = {
  toolbar: 
  {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "imageUpload",
      "mediaEmbed",
      "alignment",
      "-",
      "fontColor",
      "fontFamily",
      "fontSize",
      "fontBackgroundColor",
      "insertTable",
    ],
    shouldNotGroupWhenFull: true,
  },
};

const ckeditor = ({ onChange, data }) => {
    return (
      <div>
        <CKEditor
          editor={Editor}
          config={config}
          data={data}
          onChange={(event, editor) => {
            const data = editor.getData();
            if (onChange) {
                onChange(data);
            }
        }}
        />
      </div>
    );
  }


export default ckeditor;
