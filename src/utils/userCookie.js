import Cookies from 'js-cookie';

/**
 * 设置Cookie存入
 * @param {Object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 * 获取用户Cookie信息
 */
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
  };
}

/**
 * 移除用户Cookie信息
 */
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('email');
  Cookies.remove('role');
}
