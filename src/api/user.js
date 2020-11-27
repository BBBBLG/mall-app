// 对于用户操作的接口管理
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  registered(params) {
    return axios.post('/passport/logon', params);
  },
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
};
