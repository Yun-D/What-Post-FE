import axios from "axios";
import keys from "APIs/api_key";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

export const postCreate = (postType, work_title, post_title, post_content) => {
  let data = {
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
        Authorization: localStorage.getItem("login-token"),
      },
    })
    .then((response) => {
      console.log(response.data.data);

      if (response.data.status === 201) {
        console.log("글 등록 성공");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
