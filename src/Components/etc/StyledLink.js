import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.font_size};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(props) => props.decoration_color};
    text-decoration-thickness: ${(props) => props.decoration_thckness};
  }
`;
