// 引入请求模块
import request from '@/utils/request.js';

/**
 * 获取搜索建议
 *
 */
export const get = (q) => {
    return request.get('/app/v1_0/suggestion', {
        params: {
            q
        }
    });
};
