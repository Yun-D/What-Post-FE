import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <P>2022 What-Post </P>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  background-color: bisque;
  position: relative;
  transform: translateY(100%);
`;

const P = styled.p`
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default Footer;
