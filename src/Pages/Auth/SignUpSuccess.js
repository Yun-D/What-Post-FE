import React from "react";

import theme from "../../Styles/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/DoneOutline";

const SignupSuccess = () => {
  return (
    <Container>
      <DivBox>
        <CheckIcon
          style={{
            color: `${theme.colors.mainColor}`,
            fontSize: "40px",
            margin: "10%",
          }}
        />
        <H2>회원가입이 완료되었습니다.</H2>
        <StyledP>로그인 후 왓포스트를 이용해보세요.</StyledP>

        <br />
        <Link to="/login">
          <Button>로그인</Button>
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

  @media only screen and (max-height: 500px) {
    height: 100%;
  }
`;
const DivBox = styled.div`
  width: 350px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1), 3px 3px 3px rgba(0, 0, 0, 0.1);
  background-color: white;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;

  @media only screen and (min-width: ${theme.size.laptop}) {
    margin: auto 10%;
    width: 35%;
  }
  @media only screen and (max-height: 500px) {
    margin: 5%;
    padding: 10px;
    height: auto;
  }
`;

const H2 = styled.h2`
  margin-bottom: 3%;
`;
const StyledP = styled.p`
  margin-bottom: 10%;
`;

const Button = styled.button`
  width: 280px;
`;

export default SignupSuccess;
