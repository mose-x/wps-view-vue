# 项目介绍
本项目采用VUE + ES6实现，其中jwps.es6.js是由WPS开发组特别提供，本项目对该js做了部分调整

## 特别注意
1. 次前端工程必须配合后台部分使用
2. main.js 中的axios.defaults.baseURL请自行更换，必须和[wps开放平台](https://open.wps.cn/weboffice)上的回调URL一致

## 安装依赖
```
yarn install
```

### 开发运行
```
yarn serve
```

### 生产打包
```
yarn build
```

### 演示地址
http://117.51.150.252:5000

## 已知问题
1. 第一次点击有可能页面跳转到了首页
2. 目前只在谷歌浏览器中做了测试
