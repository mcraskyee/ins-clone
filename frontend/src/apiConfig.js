//设置axios的基本配置，这里设置了baseURL
//这样在请求的时候就不用每次都写完整的url了，只需要写后面的路径就可以了
//把axios实例化，然后设置baseURL为后端的地址，然后导出这个实例化的axios对象

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

function setAuthToken(token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { axiosInstance, setAuthToken };