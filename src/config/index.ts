// src/config/index.js
// 这个 NODE_ENV 就是环境变量
// 当用npm run serve启动项目时，NODE_ENV 为 development
// 当用npm run serve:pro启动项目时，NODE_ENV 为 production
const { NODE_ENV } = process.env;
const config: any = {
  development: {
    baseUrl: 'http://localhost:3001/api',
  },
  production: {
    baseUrl: 'https://www.evziyi.top/api',
  },
};

export default {
  baseUrl: config[NODE_ENV].baseUrl,
  shareUrl: config[NODE_ENV].shareUrl,
};
