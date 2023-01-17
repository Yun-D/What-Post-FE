import React, { useRef } from "react";

import styled from "styled-components";
import theme from "../../Styles/theme";
import { LongBtn } from "../../Components/etc/Buttons";

import { onIdCheck, onSignUp } from "Utils/auth";

const SignUp = () => {
  const idRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  return (
    <Container>
      <DivBox>
        <H2>회원가입</H2>

        <InputBox>
          <label>아이디</label>
          <IDdiv className="rowDirection">
            <IDinput ref={idRef} />
            <button onClick={() => onIdCheck(idRef.current.value)}>
              중복확인
            </button>
          </IDdiv>
        </InputBox>

        <InputBox>
          <label>이메일</label>
          <input type="email" ref={emailRef} />
        </InputBox>
        <InputBox>
          <label>비밀번호</label>
          <input type="password" ref={pwdRef} />
        </InputBox>

        <br />
        <LongBtn
          onClick={() =>
            onSignUp(
              idRef.current.value,
              pwdRef.current.value,
              emailRef.current.value
            )
          }
        >
          회원가입
        </LongBtn>
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
  height: 550px;
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
const IDdiv = styled.div`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 35px;
  border: 0.5px solid gray;
  border-radius: 8px;
  padding: 5px;
`;
const IDinput = styled.input`
  height: 40px;
  margin-bottom: 0px;
  margin-right: 10px;
  border: 0.5px solid transparent;
`;

const H2 = styled.h2`
  margin-bottom: 12%;
`;

export default SignUp;
