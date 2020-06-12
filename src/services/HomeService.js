import { BASE_URL } from "./settings";
import axios from "axios";

export default class HomeService {
  constructor() {}
  static get() {
    const url = BASE_URL + "/index";
    // return axios.get(url).then((response) => {
    //   return response.data;
    // });

    let res = "";
    axios
      .get(url)
      .then((response) => {
        res = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
}
