import React from "react";

import BookInfo from "../../Components/layout/BookInfo";
import PostItem from "../../Components/layout/PostItem";

const BookDetail = () => {
  return (
    <div className="contents_div">
      <BookInfo />
      <hr />
      <PostItem />
    </div>
  );
};

export default BookDetail;
