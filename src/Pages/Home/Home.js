import React from "react";

import { SearchBar } from "Components/etc/SearchBar";
import BestSeller from "Pages/SearchBook/BestSeller";
import BoxOffice from "Pages/SearchMovie/BoxOffice";

const Home = () => {
  return (
    <div className="contents_div">
      <div>
        <SearchBar />
      </div>
      <div>
        <p>각 분야별 최신 포스트</p>
      </div>
      <div>
        <BestSeller categoryID={100} />
        <BoxOffice weekGB={0} />
      </div>
    </div>
  );
};

export default Home;
