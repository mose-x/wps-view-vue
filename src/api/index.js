// 相关请求
import axios from "axios";

// 配置默认路径前缀（须和wps开放平台回调URL一致）
// 比如你回调地址配置的是http://123.45.67.89:8080,那么这里的baseURL就填写一样的
axios.defaults.baseURL = "http://123.45.67.89:8080";

// 获取web预览文件地址
export const getViewUrlWebPath = params => {
    return axios.get("/v1/api/file/getViewUrlWebPath", { params: params});
};

// 获取后台文件列表
export const getFileList = () => {
    return axios.get("/v1/api/file/getFileList");
};

// 获取后台文件预览地址
export const getViewUrlDbPath = params => {
    return axios.get("/v1/api/file/getViewUrlDbPath", { params: params});
};
