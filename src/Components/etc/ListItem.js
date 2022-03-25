import React from "react";
import "./ListItem.css";

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
          <h3 className="title">{props.title}</h3>
          <h4 className="author">{props.authors}</h4>
          <br />
          <p className="smallText">
            {props.publisher} | {props.datetime}
          </p>

          <article>{props.contents}</article>
        </dd>
      </dl>
    </li>
  );
};

export default ListItem;
