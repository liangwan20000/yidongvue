// 引入axios实例
import request from '@/utils/request.js';

export const getArticles = ({
    channelId,
    timestamp = Date.now(),
    withTop = 1
}) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params: {
            channel_id: channelId,
            timestamp: timestamp,
            with_top: withTop
        }
    });
};
