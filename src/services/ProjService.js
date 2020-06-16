import { apiProjAll } from "./api";
export default class ProjService {
  static async get() {
    try {
      return await apiProjAll();
    } catch (err) {
      console.error(err);
    }
  }
}
