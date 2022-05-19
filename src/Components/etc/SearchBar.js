import styled from "styled-components";
import { SmallBtn } from "./Buttons";

export const SearchBar = (props) => {
  return (
    <div className="rowDirection">
      <InputSmall
        placeholder="검색어를 입력하세요."
        name="query"
        value={props.value}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
      />
      <SmallBtn onClick={props.onClick}>검색</SmallBtn>
    </div>
  );
};

const InputSmall = styled.input`
  //[검색] 작은 사이즈의 input
  flex: 3;
  width: 100%;
  margin-right: 8px;
  margin-bottom: 0px;
`;
