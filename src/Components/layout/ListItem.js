import React from "react";
import "./ListItem.css";
import theme from "../../Styles/theme";

import { StyledLink } from "../etc/StyledLink";

/////////////////////////////// 책 검색 결과를 리스트형태로 보여주는 컴포넌트
const ListItem = (props) => {
  return (
    <li className="list_li">
      <dl>
        <dd>
          <p>{props.is_end}</p>
        </dd>
      </dl>
      <dl className="list_dl">
        <img
          src={props.thumbnail}
          alt={props.thumbnail}
          width="80px"
          height="auto"
        />

        <dd className="list_dd">
          <StyledLink
            to={props.tolink}
            state={{
              thumbnail: props.thumbnail,
              title: props.title,
              authors: props.authors,
              publisher: props.publisher,
              publishDate: props.datetime,
              contents: props.contents,
            }}
            decoration_color={`${theme.colors.peacock}`}
            decoration_thckness="2px"
          >
            <h3 className="title">{props.title}</h3>
          </StyledLink>

          <h4 className="authors">{props.authors}</h4>
          <br />
          <p className="smallText">
            {props.publisher} | {props.datetime}
          </p>
        </dd>
      </dl>
    </li>
  );
};

export default ListItem;
