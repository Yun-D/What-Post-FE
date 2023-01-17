import React from "react";
import styled from "styled-components";
import theme from "../../Styles/theme";

const Footer = () => {
  return (
    <StyledFooter>
      <P>&copy; 2022 What-Post. All right reserved.</P>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  background-color: ${theme.colors.boxColor};
  position: relative;
  transform: translateY(100%);
`;

const P = styled.p`
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  color: gray;
`;

export default Footer;
