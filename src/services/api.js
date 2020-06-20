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
const deptRequest = axios.create({
  baseURL: `${BASE_URL}/dept`,
});
const projRequest = axios.create({
  baseURL: `${BASE_URL}/proj`,
});
const fileRequest = axios.create({
  baseURL: `${BASE_URL}/file`,
});
const authRequest = axios.create({
  baseURL: `${BASE_URL}/auth`,
});
const errRequest = axios.create({
  baseURL: `${BASE_URL}/error`,
});

export const apiHome = () => homeRequest.get("");
export const apiUserAll = () => userRequest.get("");
export const apiUserSingle = (id) => userRequest.get(`/${id}`);
export const apiUserDelete = (id) => userRequest.delete(`/${id}`);
export const apiUserQuery = (data) =>
  userRequest.post("/query", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const apiUserPut = (data) => userRequest.put(`/${data.id}`, data);
export const apiUserPost = (data) => userRequest.post("", data);
export const apiUserPostFile = (data) => {
  let fData = new FormData();
  if (data != null) {
    fData.append("file", data);
  }

  return userRequest.post("/ufile", fData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiDeptAll = () => deptRequest.get("");

export const apiProjAll = () => projRequest.get("");

export const apiFilePost = (data) => {
  let fData = new FormData();
  if (data != null) {
    fData.append("file", data);
  }

  return fileRequest.post("/ufile", fData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiFile2Post = (file1, file2) => {
  let fData = new FormData();
  if (file1 != null) {
    fData.append("file1", file1);
  }
  if (file2 != null) {
    fData.append("file2", file2);
  }

  return fileRequest.post("/ufile2", fData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiFilesPost = (files) => {
  let fData = new FormData();
  if (files != null) {
    for (let i in files) {
      if (i != null) {
        fData.append("files", files[i]);
      }
    }
  }

  return fileRequest.post("/ufiles", fData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiAuthLogin = (data) => authRequest.put(`/login`, data);
export const apiAuthGet = (token) =>
  authRequest.get("", {
    headers: {
      // "Content-Type":  "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const apiErr = () => errRequest.get("");
