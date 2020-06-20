import { apiAuthLogin, apiAuthGet } from "./api";
import jwt_decode from "jwt-decode";

export default class AuthService {
  static tokeyKey = "token";

  static async login(data) {
    try {
      let res = await apiAuthLogin(data);
      if (res.data.token) {
        sessionStorage.setItem(this.tokeyKey, res.data.token);
      }
    } catch (err) {
      alert(JSON.stringify(err.response.data));
    }
  }

  static async getJWTFromServer() {
    let token = this.getLocalToken();
    return await apiAuthGet(token);
  }

  static getJWTFromClient() {
    let token = sessionStorage.getItem(this.tokeyKey);
    return jwt_decode(token); //return jwt_decode(token, { header: true });
  }

  static checkLogin() {
    let token = sessionStorage.getItem(this.tokeyKey);
    return token != null;
  }

  static getLocalToken() {
    let token = sessionStorage.getItem(this.tokeyKey);
    return token ? token : "";
  }
}
