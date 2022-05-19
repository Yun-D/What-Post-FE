import { React, useState } from "react";
import styled from "styled-components";
import "./WritePost.css";

import { FullSizeBtn } from "../../../Components/etc/Buttons";
import BookInfo from "../../../Components/layout/BookInfo";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const WritePost = () => {
  //글 내용 state들
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [viewContent, setViewContent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setPostContent({
      ...postContent,
      [name]: value, //여기서 name은 "title"
    });
  };

  return (
    <Div>
      {viewContent.map((ele) => (
        <div className="temp_postTest">
          <h3>{ele.title}</h3>
          <div>{ReactHtmlParser(ele.content)}</div>
        </div>
      ))}

      <div className="contents_div">
        <BookInfo />

        <div>
          <input
            type="text"
            placeholder="포스트 제목을 입력하세요."
            onChange={getValue}
            name="title"
          />

          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요.",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPostContent({
                ...postContent,
                content: data,
              });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />

          <FullSizeBtn
            onClick={() => {
              setViewContent(viewContent.concat({ ...postContent }));
            }}
          >
            업로드
          </FullSizeBtn>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin: 20px;
`;

export default WritePost;
