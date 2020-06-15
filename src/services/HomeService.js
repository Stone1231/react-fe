import { apiHome } from "./api";
export default class HomeService {
  static async get() {
    try {
      return await apiHome();
    } catch (err) {
      console.error(err);
    }
  }
}
