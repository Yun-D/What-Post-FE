import React from "react";
import styled from "styled-components";
import "./WritePost.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WritePost = () => {
  return (
    <Div>
      <div className="temp_postTest">
        <h3>포스트 제목</h3>
        <div>내용</div>
      </div>
      <div className="contents_div">
        <div className="photoArea" />
        <div>
          <input type="text" placeholder="포스트 제목을 입력하세요." />

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
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />

          <ButtonLong>업로드</ButtonLong>
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
