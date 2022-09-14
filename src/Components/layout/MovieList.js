import React from "react";
import { StyledLink } from "Components/etc/StyledLink";

const MovieList = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.title} />
      <h3>
        {props.title} | {props.subtitle}
      </h3>

      <p>{props.pubDate}</p>
      <p>{props.director}</p>
      <p>{props.actor}</p>
    </div>
  );
};

export default MovieList;
