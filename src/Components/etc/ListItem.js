import React from "react";
import "./ListItem.css";

const ListItem = (props) => {
  return (
    <li className="list_li">
      <dl className="list_dl">
        <img
          src={props.thumbnail}
          alt={props.thumbnail}
          width="80px"
          height="auto"
        />
        <dd className="list_dd">
          <h3>{props.title}</h3>
          <h4>{props.authors}</h4>
          <p>{props.datetime}</p>
          <p>{props.publisher}</p>
          <article>{props.contents}</article>
        </dd>
      </dl>
    </li>
  );
};

export default ListItem;
