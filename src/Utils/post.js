import axios from "axios";
import keys from "APIs/api_key";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

export const postCreate = (
  postType,
  work_title,
  post_title,
  post_content,
  openOX
) => {
  let data = {
    openOX: openOX,
    type: postType,
    work_title: work_title,
    post_title: post_title,
    post_content: post_content,
  };
  let formData = new FormData();
  //TODO: 추후 multipart/form-data 방식으로 보내주도록 수정하기
  //formData.append("data", JSON.stringify(data));
  // formData.append(
  //   "data",
  //   new Blob([JSON.stringify(data)], { type: "application/json" })
  // );

  axios
    .post(`${keys.SERVER_URL}/post/createPost`, data, {
      headers: {
        //"Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token"),
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        "Access-Control-Allow-Credentials": "true",
      },
    })
    .then((response) => {
      if (response.data.status === 201) {
        window.location.replace("/my_post");
      }
    })
    .catch((error) => {
      console.log(error);
      if (error) {
        alert("컨텐츠를 선택해주세요.");
      }
    });
};

export const postRead = () => {
  axios
    .get(`${keys.SERVER_URL}/user/mypost`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token"),
        //Authorization: `Bearer ${localStorage.getItem("login-token")}`,
        // "Access-Control-Allow-Origin": `http://localhost:3000`,
        // "Access-Control-Allow-Credentials": "true",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
