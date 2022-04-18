import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";
import { LongBtn } from "../etc/LongButton";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    // <div className="contents_div">
    <Container>
      <DivBox>
        <H2>로그인</H2>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" type="password" />
        <br />
        <LongBtn>로그인</LongBtn>
        <br />
        <br />
        <Link to={""}>
          <p>아직 회원이 아니십니까?</p>
        </Link>
      </DivBox>
    </Container>
    //</div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 85vh;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const DivBox = styled.div`
  width: 60%;
  height: 70%;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1), 3px 3px 3px rgba(0, 0, 0, 0.1);
  background-color: white;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;

  @media only screen and (max-width: ${theme.size.mobile}) {
    margin: 0;
    width: 75%;
  }
  @media only screen and (min-width: ${theme.size.tablet}) {
    width: 50%;
  }
  @media only screen and (min-width: ${theme.size.laptop}) {
    margin: auto 10%;
    width: 35%;
  }
  @media only screen and (max-height: 500px) {
    padding: 10px;
    height: auto;
    z-index: -1;
    box-shadow: none;
  }
`;

const Input = styled.input`
  width: 70%;
`;
const H2 = styled.h2`
  margin-bottom: 12%;
`;

export default Login;
