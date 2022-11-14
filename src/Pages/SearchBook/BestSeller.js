import React, { useEffect, useState } from "react";
import { getBestSeller } from "APIs/api";
import keys from "APIs/api_key";
import RowDirecImages from "Components/layout/RowDirecImages";
import styled from "styled-components";

const BestSeller = (props) => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    getBestSellerHandler(props.categoryID);
  }, [props.categoryID]);

  const getBestSellerHandler = async (categoryID) => {
    const params = {
      categoryId: categoryID, //100: 국내도서, 200: 외국도서
      key: `${keys.INTERPARK_API_KEY}`,
      output: "json",
    };

    const { data } = await getBestSeller(params);
    setBestSeller(data.item);
  };

  return (
    <ItemArea className="rowDirection">
      {bestSeller.map((book, idx) => (
        <RowDirecImages
          key={idx}
          thumbnail={book.coverLargeUrl}
          title={book.title}
          author={book.author}
          publisher={book.publisher}
        />
      ))}
    </ItemArea>
  );
};

const ItemArea = styled.div`
  width: 100%;
  border: 0.5px solid #bbbbbb;
  padding: 20px;
  margin-bottom: 4px;
  background-color: white;
  border-radius: 8px;
`;

export default BestSeller;
