// 所有类目的接口
import axios from '@/axios';

export default {
  list(prams) {
    return axios.get('/category/all', { prams });
  },
};
