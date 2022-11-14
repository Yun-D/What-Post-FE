import React from "react";
import styled from "styled-components";

const RowDirecImages = (props) => {
  return (
    <ItemCard>
      <img src={props.thumbnail} alt={props.title} />
      <p>{props.title}</p>
    </ItemCard>
  );
};

const ItemCard = styled.div`
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  margin-right: 2%;
`;

export default RowDirecImages;
