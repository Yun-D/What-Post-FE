import { React, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import "./WritePost.css";

import theme from "../../../Styles/theme";

import BookInfo from "../../../Components/layout/BookInfo";
import MovieInfo from "Components/layout/MovieInfo";
import { bookSearch, movieSearch } from "APIs/api";
import BookList from "Components/layout/BookList";
import MovieList from "Components/layout/MovieList";
import BookSearchFunc from "Utils/BookSearchFunc";
import MovieSearchFunc from "Utils/MovieSearchFunc";

import ModalFrame from "Components/layout/ModalFrame";
import { FullSizeBtn, SmallBtn } from "Components/etc/Buttons";

import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setBooks,
  setPage,
  nextPage,
  isEndPage,
  m_setQuery,
  m_setItems,
  m_nextPage,
  m_setPage,
} from "Store/store";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const WritePost = () => {
  const dispatch = useDispatch(); //작업 전달하기
  //저장소에서 책검색 데이터 읽어오기
  const queryData = useSelector((state) => state.bookSearch.query);
  const bookList = useSelector((state) => state.bookSearch.books);
  const pageNum = useSelector((state) => state.bookSearch.page);
  const isEnd = useSelector((state) => state.bookSearch.isEnd);

  //저장소에서 영화검색 데이터 읽어오기
  const m_queryData = useSelector((state) => state.movieSearch.query);
  const movies = useSelector((state) => state.movieSearch.items);
  const m_pageNum = useSelector((state) => state.movieSearch.start);

  ///////////////////////////////////////////  state 선언
  //(임시) 글 내용 state들
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [viewContent, setViewContent] = useState([]);
  /////////////////임시 선언 닫음
  //선택 컨텐츠별 구분
  const [thisContent, setThisContent] = useState("");
  const [modalState, setModalState] = useState(false); //모달
  //주제 state
  const [m_isEnd, setMIsEnd] = useState(false);
  const [searchItem, setSearch] = useState(""); //검색창에 입력되는 텍스트 추적용 state
  const [isBookSelected, setIsBookSelected] = useState(false); //책 데이터 선택 됐을 경우 true
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  ///////////////////////////////////////////  state 선언 닫음

  useLayoutEffect(() => {
    if (searchItem.length > 1) {
      if (thisContent === "book") {
        bookSearchHandler(queryData, pageNum);
      } else if (thisContent === "movie") {
        movieSearchHandler(m_queryData, m_pageNum);
      }
    }

    if (!modalState) {
      //초기화 처리
      dispatch(setQuery(""));
      dispatch(setPage(1));
      dispatch(setBooks([]));
      dispatch(isEndPage(true));
      dispatch(m_setQuery(""));
      dispatch(m_setPage(1));
      dispatch(m_setItems([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData, pageNum, m_queryData, m_pageNum]);

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
  //영화 검색
  const movieSearchHandler = async (query, start) => {
    const params = {
      query: query, //검색어
      start: start, //검색 시작 위치 지정
      display: 10, //1~50. 출력할 검색 결과 수
    };

    const { data } = await movieSearch(params); //api 호출
    if (data.items.length < 10) {
      //더이상 더보기로 보여줄 데이터가 없는 경우 더보기 버튼 제거
      setMIsEnd(true);
    }

    if (start === 1) {
      dispatch(m_setItems(data.items));
    } else if (start >= 11) {
      let beforeData = movies[start - 2].title;

      if (data.items[data.items.length - 1].title === beforeData) {
        //다음에 올 데이터가 기존데이터(beforeData)와 같을 경우(더이상 검색 결과가 없을 경우) 더보기 버튼 제거, 알림창 출력
        setMIsEnd(true);
        alert("더이상 결과가 없습니다.");
      } else {
        dispatch(m_setItems(movies.concat(data.items)));
      }
    }
  };
  /////////////////////////////////영화 검색용 함수들 닫음

  /////////////////////////////////모달용 함수들
  const openModal = (props) => {
    //e.preventDefault();
    setModalState(true);

    if (props === "book") {
      setThisContent("book");
    } else if (props === "movie") {
      setThisContent("movie");
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
    dispatch(m_setQuery(""));
    dispatch(m_setPage(1));
    dispatch(m_setItems([]));
  };
  /////////////////////////////////모달용 함수들 닫음

  ////////////////////////////////주제 선택용 함수
  const selectBook = () => {
    //도서 주제 선택
    setIsBookSelected(true);
    closeModal();
  };
  const selectMovie = () => {
    //영화 주제 선택
    setIsMovieSelected(true);
    closeModal();
  };
  const cancelSubject = () => {
    //주제 선택 취소
    setIsBookSelected(false);
    setIsMovieSelected(false);
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
        <TempPostTest>
          <h3>{ele.title}</h3>
          <div>{ReactHtmlParser(ele.content)}</div>
        </TempPostTest>
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
          {isMovieSelected && (
            <div className="contents_div">
              <MovieInfo />
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
              //console.log("Editor is ready to use!", editor);
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
          {/* // ************************ 책 검색 모달 ************************ */}
          {thisContent === "book" && (
            <>
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
                <BookList
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
            </>
          )}

          {/* // ************************ 영화 검색 모달 ************************ */}
          {thisContent === "movie" && (
            <>
              <MovieSearchFunc
                m_setQuery={m_setQuery}
                m_setPage={m_setPage}
                m_setItems={m_setItems}
                setSearch={setSearch}
                search={searchItem}
                dispatch={dispatch}
                onChange={(searchQuery) => setSearch(...searchQuery)}
              />
              <Blank />

              {movies.map((movie, idx) => (
                <MovieList
                  key={idx}
                  thumbnail={movie.image}
                  title={movie.title}
                  subtitle={movie.subtitle}
                  datetime={movie.pubDate}
                  director={movie.director}
                  actor={movie.actor}
                  tolink={"./"}
                  onClick={selectMovie}
                  detailLink={movie.link}
                />
              ))}
              <Blank />
              {m_isEnd && (
                <SmallBtn
                  onClick={() => {
                    dispatch(m_nextPage());
                  }}
                >
                  더보기
                </SmallBtn>
              )}
            </>
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

const TempPostTest = styled.div`
  border: 1px solid;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
`;

export default WritePost;
