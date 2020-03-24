/* Encapsulate axios */
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      // GET Request
      promise = axios.get(url, {
        params: data
      });
    } else {
      // POST Reqeust
      promise = axios.post(url, data);
    }
    promise
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        message.error("Request error: " + error);
      });
  });
}
