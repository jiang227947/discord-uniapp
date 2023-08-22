// 引入请求
import request from '../request';
// 注册接口
const registerPost = (data: { name: string; password: string }) => request.post('/register', data);
// 登录接口
const loginPost = (data: { userName: string; password: string }) => request.post('/login', data);
// 获取登录凭证Code接口
const wxCodeAuthorization = (data: { code: string; avatar?: string; name?: string }) => request.get('/wxCodeAuthorization', data);

export { registerPost, loginPost, wxCodeAuthorization };
