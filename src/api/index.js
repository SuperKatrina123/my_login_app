import ajax from './ajax';


// 注册
export const reqRegister = (username, password) => ajax('POST', '/api/register', {username, password});


// 登录
export const reqLogin = (username, password) => ajax('POST', '/api/login', {username, password});

// 权限校验 
export const reqAuth = () => ajax('POST', '/api/auth', {});

