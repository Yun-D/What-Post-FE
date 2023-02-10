import axios from "axios";
import keys from "APIs/api_key";

//const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

export const onLogin = (userid, userpwd) => {
  const data = {
    userid,
    userpwd,
  };
  axios
    .post(`${keys.SERVER_URL}/user/signin`, {
      username: userid,
      pwd: userpwd,
    })
    //.then(onLoginSuccess)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onIdCheck = (userid) => {
  axios
    .post(`${keys.SERVER_URL}/user/idcheck`, {
      //url에 데이터 담아서 요청
      username: userid,
    })
    .then((response) => {
      //요청 성공 시 실행
      console.log(response);
    })
    .catch((error) => {
      //요청 실패 시 실행
      console.log(error);
    });
};

export const onSignUp = (userid, userpwd, useremail) => {
  const data = { username: userid, pwd: userpwd, email: useremail };
  axios
    .post(`${keys.SERVER_URL}/user/signup`, data)
    .then(function (response) {
      console.log(response);
      //TODO: 회원가입 후 로그인 페이지로 이동하도록 수정
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

// export const onSilentRefresh = () => {
//     axios.post('/silent-refresh', data)
//         .then(onLoginSuccess)
//         .catch(error => {
//             // ... 로그인 실패 처리
//         });
// }

export const onLoginSuccess = (response) => {
  const { accessToken } = response.data;

  // accessToken 설정
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  // accessToken 만료하기 1분 전에 로그인 연장
  //setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
};
