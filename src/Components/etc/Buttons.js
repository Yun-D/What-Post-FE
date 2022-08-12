import styled from "styled-components";
import theme from "Styles/theme";

//글로벌 스타일 button 확장
export const LongBtn = styled.button`
  width: 70%;
`;

export const FullSizeBtn = styled.button`
  width: 100%;
  margin-bottom: 6px;
`;

export const SmallBtn = styled.button`
  width: 20%;
  margin: 10px;
`;

export const TextButton = styled.button`
  max-height: 2rem;
  line-height: 2rem;
  width: auto;
  font-size: ${theme.textSize.postContents};
  font-weight: 700;
  padding: 0px;
  background-color: unset;
  cursor: pointer;
  color: ${theme.colors.peacockGray};
`;
