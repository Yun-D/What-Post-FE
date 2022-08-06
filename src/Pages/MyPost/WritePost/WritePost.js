import { React, useState } from "react";
import styled from "styled-components";
import "./WritePost.css";

import theme from "../../../Styles/theme";
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
    <div className="contents_div">
      {viewContent.map((ele) => (
        <div className="temp_postTest">
          <h3>{ele.title}</h3>
          <div>{ReactHtmlParser(ele.content)}</div>
        </div>
      ))}

      <div>
        {/* <BookInfo /> */}
        <SubjectDiv>
          <SubjectButton>
            <ImgIcon src={require("Assets/icn_book.png")} alt="book" /> 도서
          </SubjectButton>
          <SubjectButton>
            <ImgIcon src={require("Assets/icn_drama.png")} alt="drama" />
            드라마
          </SubjectButton>
          <SubjectButton>
            <ImgIcon src={require("Assets/icn_movie.png")} alt="movie" />
            영화
          </SubjectButton>
        </SubjectDiv>

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
    </div>
  );
};

const SubjectDiv = styled.div`
  background-color: ${theme.colors.boxColor};
  height: 80px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  display: flex;
  padding: 0 1%;

  @media only screen and (max-width: 700px) {
    justify-content: center;
  }
`;

const SubjectButton = styled.button`
  background-color: white;
  color: gray;
  height: 60px;
  width: 170px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  margin-right: 1%;
  display: flex;
  font-size: 1.3rem;
  box-shadow: ${theme.size.boxLightShadow};
`;
const ImgIcon = styled.img`
  height: 35px;
  width: auto;
  margin-right: 8%;
`;

export default WritePost;
