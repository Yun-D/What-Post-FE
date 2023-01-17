import React from "react";

import BookInfo from "../../Components/layout/BookInfo";
import PostItem from "../../Components/layout/PostItem";

import { postDummy } from "../../Assets/dummy"; //테스트용 임시 데이터

const BookDetail = () => {
  return (
    <div className="contents_div">
      <BookInfo />
      <hr />
      {postDummy.map((data) => (
        <PostItem
          key={data.id}
          title={data.title}
          contents={data.contents}
          nickname={data.nickname}
        />
      ))}
    </div>
  );
};

export default BookDetail;
