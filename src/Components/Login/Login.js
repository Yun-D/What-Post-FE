import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";
import { LongBtn } from "../etc/LongButton";

import { Link } from "react-router-dom";

const Login = () => {
  return (
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
  width: 45%;
  height: 70%;
  //border: 1px solid ${theme.colors.lightGray};
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);
  background-color: white;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const Input = styled.input`
  width: 70%;
`;
const H2 = styled.h2`
  margin-bottom: 12%;
`;

export default Login;
