import React from "react";
import { useState } from "react";

import { SearchBar } from "Components/etc/SearchBar";
import BoxOffice from "Pages/SearchMovie/BoxOffice";
import styled from "styled-components";

const Home = () => {
  const [selected, setSelected] = useState("");

  const selectList = [
    { value: "post", name: "포스트 검색" },
    { value: "user", name: "유저 검색" },
  ];
  const selectHandle = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="contents_div">
      <div className="rowDirection">
        <StyledSelect onChange={selectHandle} value={selected}>
          {selectList.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
        <SearchBar />
      </div>
      <div>
        <p>각 분야별 최신 포스트</p>
      </div>
      <div>
        <BoxOffice weekGB={0} />
      </div>
    </div>
  );
};

const StyledSelect = styled.select`
  width: 16vh;
  height: 45px;
  border-radius: 8px;
  border: gray solid 0.5px;
  margin-right: 0.5%;
`;

export default Home;
