import React from "react";
import styled from "styled-components";
import theme from "Styles/theme";

const RowDirecImages = (props) => {
  return (
    <ContainerDiv>
      <ItemCard>
        <ItemIMG src={props.thumbnail} alt={props.thumbnail} />
        <ItemP>{props.title}</ItemP>
      </ItemCard>
    </ContainerDiv>
  );
};

const ContainerDiv = styled.ul`
  display: inline-block;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
`;
const ItemCard = styled.div`
  flex-direction: column;
  background-color: white;
  width: 170px;
  white-space: pre-line;
  overflow: hidden;
`;

const ItemIMG = styled.img`
  width: 150px;
  box-shadow: ${theme.size.boxShadow};
  margin-bottom: 5%;
  border-radius: 5px;
`;
const ItemP = styled.p`
  font-size: ${theme.textSize.postContents};
  width: 150px;
  height: 40px;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default RowDirecImages;
