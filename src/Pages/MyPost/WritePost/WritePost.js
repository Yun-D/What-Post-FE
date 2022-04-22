import { React, useState } from "react";
import styled from "styled-components";
import theme from "../../../Styles/theme";
import "./WritePost.css";
import { FullSizeBtn } from "../../../Components/etc/LongButton";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";

const WritePost = () => {
  const location = useLocation(); //ListItem에서 선택하여 state로 보낸 책 데이터를 받는다

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
        <Div className="rowDirection">
          <img src={location.state.thumbnail} alt={location.state.thumbnail} />
          <DivBookInfo>
            <H1>{location.state.title}</H1>
            <div className="rowDirection">
              <H3>{location.state.authors}</H3>
              <CircleIcon
                style={{
                  color: `${theme.colors.peacockGray}`,
                  fontSize: "8px",
                  marginRight: "2%",
                }}
              />
              <p className="subText">
                {location.state.publisher} ({location.state.publishDate})
              </p>
            </div>
            <br /> <Hr /> <br />
            <DivBookArticle>
              <article>{location.state.contents + " ..."}</article>
            </DivBookArticle>
          </DivBookInfo>
        </Div>

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
const DivBookInfo = styled.div`
  margin-left: 50px;
  width: 100%;
  height: auto;
`;
const DivBookArticle = styled.div`
  height: 100px;
  //overflow-y: scroll;
`;

const Hr = styled.hr`
  background-color: ${theme.colors.lightGray};
  border-width: 1px 0px 0px 0px;
  height: 1px;
`;

const H1 = styled.h1`
  color: ${theme.colors.peacock};
`;
const H3 = styled.h3`
  color: ${theme.colors.peacockGray};
  margin-right: 2%;
`;
export default WritePost;
