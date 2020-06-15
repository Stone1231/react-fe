import {
  apiUserAll,
  apiUserSingle,
  apiUserDelete,
  apiUserPost,
  apiUserPut,
  apiUserQuery,
  apiUserPostFile,
} from "./api";
export default class UserService {
  static async get() {
    try {
      return await apiUserAll();
    } catch (err) {
      console.error(err);
    }
  }
  static async getSingle(id) {
    try {
      return await apiUserSingle(id);
    } catch (err) {
      console.error(err);
    }
  }
  static async delete(id) {
    try {
      return await apiUserDelete(id);
    } catch (err) {
      console.error(err);
    }
  }
  static async getQuery(data) {
    try {
      return await apiUserQuery(data);
    } catch (err) {
      console.error(err);
    }
  }
  static async post(data) {
    try {
      return await apiUserPost(data);
    } catch (err) {
      console.error(err);
    }
  }
  static async put(data) {
    try {
      return await apiUserPut(data);
    } catch (err) {
      console.error(err);
    }
  }
  static async upload(data) {
    try {
      return await apiUserPostFile(data);
    } catch (err) {
      console.error(err);
    }
  }
}
