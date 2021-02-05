import axios from "axios";
// import store from "../store/index";
// import router from "../router/index";
import { getLoginToken } from "./Auth";

const errorAlert = (res) => {
  if (
    !res.success &&
    typeof res.message == typeof [] &&
    res.message.length > 0
  ) {
    alert(res.message.pop());
  } else {
    !res.success && typeof res.message == typeof "";
    alert(res.message);
  }
};

// 創建axios實例
const service = axios.create({
  baseURL: "http://35.229.168.22:8080/api/v1/", // api 的 base_url
  timeout: 5000, // 請求超時時間
  // headers: {
  //   Authorization: `Bearer ${getLoginToken()}`,
  // },
});

service.defaults.withCredentials = false; // 預設是false,如果打開即便後端有傳回,如過不同域無法取得資料
let TOKEN = null;
// request攔截器
service.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      await getLoginToken().then((token) => {
        console.log("加token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }

    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 攔截器
service.interceptors.response.use(
  (response) => {
    /**
     *
     */
    // console.log("response", response);

    return response;
  },
  (error) => {
    if (error.response) {
      const res = error.response.data;
      console.log(res);
      switch (error.response.status) {
        case 500:
          errorAlert(res);
          break;
        case 401:
        // alert("請先登入!");
        // router.replace({
        //   path: "/login",
        // });
      }
    }
    return Promise.reject(error);
  }
);

export default service;
