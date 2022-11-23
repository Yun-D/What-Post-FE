import React, { useEffect, useRef, useState } from "react";
import { getBestSeller } from "APIs/api";
import keys from "APIs/api_key";
import RowDirecImages from "Components/layout/RowDirecImages";
import styled from "styled-components";
import LeftIcon from "@material-ui/icons/ChevronLeft";
import RightIcon from "@material-ui/icons/ChevronRight";

const BestSeller = (props) => {
  const [bestSeller, setBestSeller] = useState([]);
  const [carouselCount, setCarouselCount] = useState(0);

  const moveButton = useRef();

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

  const carouselHandler = () => {
    moveButton.current.style.transform = `translateX(-30%)`;
  };

  return (
    <Div>
      <ItemArea className="rowDirection">
        <ULarea ref={moveButton}>
          {bestSeller.map((book, idx) => (
            <RowDirecImages
              key={idx}
              thumbnail={book.coverLargeUrl}
              title={book.title}
              author={book.author}
              publisher={book.publisher}
            />
          ))}
        </ULarea>
      </ItemArea>

      <ButtonArea>
        <MoveBtn onClick={carouselHandler}>
          <LeftIcon fontSize="large" />
        </MoveBtn>

        <Blank />
        <MoveBtn>
          <RightIcon fontSize="large" />
        </MoveBtn>
      </ButtonArea>
    </Div>
  );
};

const Div = styled.div`
  height: 100%;
  position: relative;
`;
const Blank = styled.div`
  flex: 999;
  width: 90%;
  height: 100%;
`;
const ItemArea = styled.div`
  width: 100%;
  border: 0.5px solid #bbbbbb;
  padding: 20px;
  margin-bottom: 4px;
  background-color: white;
  border-radius: 8px;
`;
const ButtonArea = styled.div`
  width: 100%;
  position: absolute;
  top: 40%;
  padding: 1%;
  display: flex;
`;
const ULarea = styled.ul`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
`;

const MoveBtn = styled.button`
  height: 52px;
  width: 52px;
  border-radius: 50px;
  background-color: #6badb6cc;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default BestSeller;
