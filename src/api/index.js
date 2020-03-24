import ajax from "./ajax";
import axios from "axios";
import { message } from "antd";
// const BASE = "http://localhost:5000";
const BASE = "";
// Login
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

// Add user
export const reqAddUser = user => ajax(BASE + "/manage/user/add", user, "POST");

// Get category lists
export const reqCategories = parentId =>
  ajax(BASE + "/manage/category/list", { parentId });

// Update a category
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// Add a category
export const reqAddCategory = ({ parentId, categoryName }) =>
  ajax(BASE + "/manage/category/add", { parentId, categoryName }, "POST");

// Request product list
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });

// Search product based on name or description
export const reqSearchProducts = ({pageNum, pageSize,keywords,searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]:keywords
})

// Getting weather info
export const reqWeather = zip => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=1e8c28669e9ce829c28e99ac6cae3c0e&units=metric`;
    const req = axios(url);
    req
      .then(data => {
        const obj = {
          temp: data.data.main.temp,
          name: data.data.name
        };
        resolve(obj);
      })
      .catch(err => {
        message.error(
          "Retreiving weather info failed, please check your settings."
        );
      });
  });
};
