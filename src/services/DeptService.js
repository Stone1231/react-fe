import { apiDeptAll } from "./api";
export default class DeptService {
  static async get() {
    try {
      return await apiDeptAll();
    } catch (err) {
      console.error(err);
    }
  }
}
