import { React, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import "./WritePost.css";

import theme from "../../../Styles/theme";

import BookInfo from "../../../Components/layout/BookInfo";
import { bookSearch } from "APIs/api";
import Item from "Components/layout/BookList";
import ModalFrame from "Components/layout/ModalFrame";
import { FullSizeBtn, SmallBtn } from "Components/etc/Buttons";
import BookSearchFunc from "Utils/BookSearchFunc";

import { useDispatch, useSelector } from "react-redux";
import { setQuery, setBooks, setPage, nextPage, isEndPage } from "Store/store";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const WritePost = () => {
  //저장소에서 책검색 데이터 읽어오기
  const queryData = useSelector((state) => state.bookSearch.query);
  const bookList = useSelector((state) => state.bookSearch.books);
  const pageNum = useSelector((state) => state.bookSearch.page);
  const isEnd = useSelector((state) => state.bookSearch.isEnd);
  const dispatch = useDispatch(); //작업 전달하기

  ///////////////////////////////////////////  state 선언
  //(임시) 글 내용 state들
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [viewContent, setViewContent] = useState([]);
  //도서 state
  const [modalState, setModalState] = useState(false); //모달
  const [searchItem, setSearch] = useState("");
  //주제 state
  const [isBookSelected, setIsBookSelected] = useState(false); //책 데이터 선택 됐을 경우 true
  ///////////////////////////////////////////  state 선언 닫음

  useLayoutEffect(() => {
    //componentDidMount/Update/WillUnmount 일 경우 실행
    //(query state가 업데이트되면 api 호출)
    if (searchItem.length > 1) {
      bookSearchHandler(queryData, pageNum);
    }

    if (!modalState) {
      //초기화 처리
      dispatch(setQuery(""));
      dispatch(setPage(1));
      dispatch(setBooks([]));
      dispatch(isEndPage(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum]);

  //책 검색
  const bookSearchHandler = async (query, page) => {
    const params = {
      query: query, //검색어
      sort: "accuracy", //accuracy: 정확도, latest: 발간일 순
      page: page,
      size: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await bookSearch(params); //책 검색 api 호출
    if (page === 1) {
      dispatch(setBooks(data.documents));
    } else if (page >= 2) {
      dispatch(setBooks(bookList.concat(data.documents)));
    }

    dispatch(isEndPage(data.meta.is_end)); //다음 페이지가 있으면 false
  };
  /////////////////////////////////책 검색용 함수들 닫음

  /////////////////////////////////모달용 함수들
  const openModal = (props) => {
    //e.preventDefault();
    setModalState(true);

    if (props === "book") {
      console.log("boooooK");
      //TODO: 현재 state 책으로 변경, 추후 state에 따라 렌더 내용 다르게 할 것
    }
  };
  const closeModal = () => {
    setModalState(false);

    //모달창 닫기와 동시에 쿼리 초기화
    setSearch("");
    dispatch(setQuery(""));
    dispatch(setPage(1));
    dispatch(setBooks([]));
    dispatch(isEndPage(true));
  };
  /////////////////////////////////모달용 함수들 닫음

  ////////////////////////////////주제 선택용 함수
  const selectBook = () => {
    //도서 주제 선택
    setIsBookSelected(true);
    closeModal();
  };
  const cancelSubject = () => {
    //주제 선택 취소
    setIsBookSelected(false);
  };
  ////////////////////////////주제 선택용 함수 닫음

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
        <SubjectDiv>
          <SubjectButton onClick={() => openModal("book")}>
            <ImgIcon src={require("Assets/icn_book.png")} alt="book" /> 도서
          </SubjectButton>
          <SubjectButton>
            <ImgIcon src={require("Assets/icn_drama.png")} alt="drama" />
            드라마
          </SubjectButton>
          <SubjectButton onClick={() => openModal("movie")}>
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

          {isBookSelected && (
            <div className="contents_div">
              <BookInfo />
              <Div className="rowDirection">
                <Blank />
                <TinyButton onClick={cancelSubject}>주제 선택 취소</TinyButton>
              </Div>
            </div>
          )}

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

      {modalState && (
        <ModalFrame state={modalState} closeModal={closeModal}>
          <BookSearchFunc
            setQuery={setQuery}
            setPage={setPage}
            setBooks={setBooks}
            setSearch={setSearch}
            search={searchItem}
            dispatch={dispatch}
            onChange={(searchQuery) => setSearch(...searchQuery)}
          />
          <Blank />
          {bookList.map((book, idx) => (
            <Item
              key={idx}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              datetime={book.datetime.substr(0, 4)}
              publisher={book.publisher}
              contents={book.contents}
              tolink={"./"}
              onClick={selectBook}
            />
          ))}
          <Blank />

          {!isEnd && (
            <SmallBtn
              onClick={() => {
                dispatch(nextPage());
              }}
            >
              더보기
            </SmallBtn>
          )}
        </ModalFrame>
      )}
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

  @media only screen and (max-width: ${theme.size.mobile_landscape}) {
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
const TinyButton = styled.button`
  height: 35px;
  flex: 1.5;
  font-size: 0.8rem;
  background-color: ${theme.colors.boxColor_light};
  color: gray;
  font-weight: 500;

  @media only screen and (max-width: ${theme.size.tablet}) {
    flex: 4;
  }
`;
const ImgIcon = styled.img`
  height: 35px;
  width: auto;
  margin-right: 8%;
`;

const Div = styled.div`
  flex: 1;
  margin: 0.1% 0 2%;
`;
const Blank = styled.div`
  height: 10px;
  flex: 8.5;

  @media only screen and (max-width: ${theme.size.tablet}) {
    flex: 6;
  }
`;

export default WritePost;
