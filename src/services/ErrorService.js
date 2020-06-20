import { apiErr } from "./api";
export default class ErrorService {
  static async getAsync() {
    try {
      return await apiErr();
    } catch (err) {
      alert(JSON.stringify(err.response.data));
      console.error(err);
    }
  }

  static get() {
    try {
      return apiErr();
    } catch (err) {
      console.error(err);
    }
  }
}
