import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { apiAuthLogin, apiAuthGet } from "./api";
import jwt_decode from "jwt-decode";

export default class AuthService {
  static tokeyKey = "token";

  static async login(data) {
    //let body = JSON.stringify({ "username": userName, "pwd": password });
    // try {
    //   return await apiAuthLogin(data).then((m) => {
    //     if (m.data.token) {
    //       sessionStorage.setItem(this.tokeyKey, m.data.token);
    //     }
    //     return m;
    //   });
    // } catch (err) {
    //   console.error(err);
    // }

    return await apiAuthLogin(data).then((m) => {
      if (m.data.token) {
        sessionStorage.setItem(this.tokeyKey, m.data.token);
      }
      catchError(this.handleError);
    });
  }

  static async getJWTFromServer() {
    let token = this.getLocalToken();
    return await apiAuthGet(token).then((m) => {
      catchError(this.handleError);
      return m;
    });
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
    // return sessionStorage.getItem(this.tokeyKey);
  }

  static handleError(error) {
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    //console.error(error.ok);
    //console.error(error._body);
    //console.error(error.status);
    //console.error(errMsg);
    switch (error.status) {
      case 401:
        //...
        break;
    }
    return throwError(errMsg);
  }
}
