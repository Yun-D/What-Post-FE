import { React, useState } from "react";
import styled from "styled-components";
import "./WritePost.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const WritePost = () => {
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
        <div className="photoArea" />
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

          <ButtonLong
            onClick={() => {
              setViewContent(viewContent.concat({ ...postContent }));
            }}
          >
            업로드
          </ButtonLong>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin: 20px;
`;

const ButtonLong = styled.button`
  //글로벌 스타일 button 확장
  width: 100%;
  margin-bottom: 4px;
`;

export default WritePost;
