import axios from "axios";

export const URL = "http://localhost:8000";
export const BASE_URL = `${URL}/api`;
export const IMG_URL = `${URL}/static`;

const homeRequest = axios.create({
  baseURL: `${BASE_URL}/index`,
});
const userRequest = axios.create({
  baseURL: `${BASE_URL}/user`,
});

// const articleRequest = axios.create({
//     baseURL: 'https://api/article/'
// });
//
// const searchRequest = axios.create({
//     baseURL: 'https://api/search/'
// });

export const apiHome = (data) => homeRequest.get("", data);
export const apiUserAll = () => userRequest.get("");
export const apiUserSingle = (id) => userRequest.get(`/${id}`);
export const apiUserDelete = (id) => userRequest.delete(`/${id}`);
export const apiUserQuery = (data) =>
  userRequest.post("", {
    params: {
      keyWord: data,
    },
  });
export const apiUserPut = (data) => userRequest.put(`/${data.id}`, data);
export const apiUserPost = (data) => userRequest.post("", data);
export const apiUserPostFile = (data) => {
  let fData = new FormData();
  if (data != null) {
    fData.append("file", data);
  }

  return axios.post(`${this.url}/ufile`, fData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//  getQuery(keyWord?: string) {
// export const apiUserLogout = data => userRequest.post('/signOut', data);
// export const apiUserSignUp = data => userRequest.post('/signUp', data);
