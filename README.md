# 项目介绍
本项目采用VUE + ES6实现，其中jwps.es6.js是由WPS开发组特别提供，本项目对该js做了部分调整


## 后续更新
1. 后续更新全部转移到国内gitee，请知晓
2. [传送门](https://gitee.com/mose-x/wps-view-vue)



## 本次更新
1. 增加新建模版入口，快速新建word，excel，ppt文件
2. 增加上传、删除等文件管理入口
3. 调整目录结构，调整vueconfig

## 特别注意
1. 次前端工程必须配合后台部分使用
2. main.js 中的axios.defaults.baseURL请自行更换，必须和[wps开放平台](https://open.wps.cn/weboffice)上的回调URL一致

### 演示地址
[https://ljserver.cn/wpsonline](https://ljserver.cn/wpsonline)

## 后台java代码地址
[https://github.com/mose-x/wps-view-java.git](https://github.com/mose-x/wps-view-java.git)

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
