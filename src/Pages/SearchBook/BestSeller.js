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

  const moveCarousel = useRef();
  const leftBtn = useRef();
  const rightBtn = useRef();

  useEffect(() => {
    getBestSellerHandler(props.categoryID);

    if (carouselCount < 0) {
      setCarouselCount(1);
    }

    if (carouselCount === 0) {
      moveCarousel.current.style.transform = `translateX(0%)`;
      leftBtn.current.style.visibility = `hidden`;
    } else {
      leftBtn.current.style.visibility = `visible`;
      moveCarousel.current.style.transform = `translateX(-${
        50 * carouselCount
      }vh)`;
    }
  }, [props.categoryID, carouselCount]);

  const getBestSellerHandler = async (categoryID) => {
    const params = {
      categoryId: categoryID, //100: 국내도서, 200: 외국도서
      key: `${keys.INTERPARK_API_KEY}`,
      output: "json",
    };

    const { data } = await getBestSeller(params);
    setBestSeller(data.item);
  };

  const goCarouselLeft = () => {
    setCarouselCount(carouselCount - 1);
  };
  const goCarouselRight = () => {
    setCarouselCount(carouselCount + 1);
  };

  return (
    <Div>
      <ItemArea className="rowDirection">
        <ULarea ref={moveCarousel}>
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
        <MoveBtn onClick={goCarouselLeft} ref={leftBtn}>
          <LeftIcon fontSize="large" />
        </MoveBtn>

        <Blank />
        <MoveBtn onClick={goCarouselRight} ref={rightBtn}>
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
  overflow: hidden;
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
  transition: 0.3s;
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
