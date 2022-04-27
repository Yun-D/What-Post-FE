import { React, useState, memo, useCallback, useEffect } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Masonry from "../../Components/layout/Masonry";
import { initialTexts, initialImages } from "../../Assets/dummy";
import theme from "../../Styles/theme";

//Masonry 레이아웃을 위한 코드
const MasonryElement = memo(({ value }) => (
  <StyledMasonryCard>
    <p style={{ textAlign: "center" }}>{value}</p>
  </StyledMasonryCard>
));
const ImageElement = memo(({ value }) => (
  <div style={{ borderRadius: "10px", margin: "5px" }}>
    <img
      src={value}
      style={{ width: "100%", borderRadius: "10px", flex: 1 }}
      alt="images"
    />
  </div>
));

//TODO: 향후 리팩토링 필요, 중복 코드 수정요
const BookMain = () => {
  //책검색 데이터셋, 검색어, 쿼리 state 생성
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); //책 검색 쿼리

  const navigate = useNavigate();

  /////////////////////////////////책 검색용 함수들
  const onClickSearch = () => {
    setQuery(search);
    goToSearch();
  };
  const goToSearch = () => {
    navigate("/search_book/search", { state: search });
  };

  //엔터를 눌렀을 때 쿼리를 검색어로 교체하는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onClickSearch();
    }
  };

  //text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setSearch(e.target.value);
  };

  //////////////////////////////Masonry 레이아웃을 위한 코드
  const [data, setData] = useState(initialTexts);
  const [images, setImages] = useState(initialImages);

  const handleData = useCallback(
    () => setData((prev) => [...prev, ...initialTexts]),
    [setData]
  );
  const handleImages = useCallback(
    () => setImages((prev) => [...prev, ...initialImages]),
    [setImages]
  );

  /**
   * this code is example of responsive column, how many columns will be rendered if width of screen reach a certain value
   */

  const settingColumns = useCallback(() => {
    if (window.innerWidth >= 1400) return 4;
    if (window.innerWidth >= 800) return 3;
    if (window.innerWidth >= 500) return 2;
    return 1;
  }, []);

  const [column, setColumn] = useState(() => settingColumns());

  useEffect(() => {
    window.addEventListener("resize", () => setColumn(() => settingColumns()));

    return window.removeEventListener("resize", () =>
      setColumn(() => settingColumns())
    );
  }, [setColumn, settingColumns]);

  return (
    <div className="contents_div">
      <Div className="rowDirection">
        <Input
          placeholder="검색어를 입력하세요."
          name="query"
          value={search}
          onKeyDown={onEnter}
          onChange={onTextUpdate}
        />
        <button onClick={onClickSearch}>검색</button>
      </Div>

      <div> 최신/랜덤 이용자 포스트 </div>
      <div style={{ padding: "5px" }}>
        <Masonry
          dataArray={data}
          columnCount={column}
          ChildsElement={MasonryElement}
        />
      </div>
      <button
        onClick={handleData}
        style={{
          cursor: "pointer",
          padding: "20px",
          display: "block",
          margin: "30px auto",
        }}
      >
        Load More
      </button>
    </div>
  );
};

const Div = styled.div`
  margin: 2% 0 2%;
`;

const Input = styled.input`
  margin-bottom: 0;
  margin-right: 2%;
`;

const StyledMasonryCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  background-color: ${theme.colors.boxColor};
  color: black;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1), 3px 3px 3px rgba(0, 0, 0, 0.1);
`;

export default BookMain;
