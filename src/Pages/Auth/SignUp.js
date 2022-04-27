import React from "react";

import styled from "styled-components";
import theme from "../../Styles/theme";
import { LongBtn } from "../../Components/etc/LongButton";

const SignUp = () => {
  return (
    <Container>
      <DivBox>
        <H2>회원가입</H2>
        <InputBox>
          <label>아이디</label>
          <input />
        </InputBox>
        <InputBox>
          <label>이메일</label>
          <input type="email" />
        </InputBox>
        <InputBox>
          <label>비밀번호</label>
          <input type="password" />
        </InputBox>

        <br />
        <LongBtn>회원가입</LongBtn>
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

  @media only screen and (max-height: 500px) {
    height: 100%;
  }
`;
const DivBox = styled.div`
  width: 500px;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1), 3px 3px 3px rgba(0, 0, 0, 0.1);
  background-color: white;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 90%;
  }
  @media only screen and (min-width: ${theme.size.laptop}) {
    margin: auto 10%;
    width: 50%;
  }
  @media only screen and (max-height: 500px) {
    margin: 5%;
    padding: 10px;
    height: auto;
  }
`;
const InputBox = styled.div`
  flex-direction: column;
  display: flex;
  width: 70%;
  margin-bottom: 10px;
`;

const H2 = styled.h2`
  margin-bottom: 12%;
`;

export default SignUp;
