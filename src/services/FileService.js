import { apiFilePost, apiFile2Post, apiFilesPost, apiUserPost } from "./api";
export default class FileService {
  static async uploadFile(data) {
    try {
      return await apiFilePost(data);
    } catch (err) {
      console.error(err);
    }
  }
  static async uploadFile2(file1, file2) {
    try {
      return await apiFile2Post(file1, file2);
    } catch (err) {
      console.error(err);
    }
  }
  static async uploadFiles(data) {
    try {
      return await apiFilesPost(data);
    } catch (err) {
      console.error(err);
    }
  }
}
