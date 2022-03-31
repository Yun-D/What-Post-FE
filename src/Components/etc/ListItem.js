import React from "react";
import "./ListItem.css";
import theme from "../../Styles/theme";

import { Link } from "react-router-dom";
import styled from "styled-components";

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
            to="/my_post/write_post"
            state={{
              thumbnail: props.thumbnail,
              title: props.title,
              authors: props.authors,
              publisher: props.publisher,
              publishDate: props.datetime,
              contents: props.contents,
            }}
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

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${theme.colors.peacock};
    text-decoration-thickness: 2px;
  }
`;

export default ListItem;
