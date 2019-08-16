// 引入request
import request from '@/utils/request.js';

// 获取文章或评论的评论
export const getComentList = ({
    // 评论类型
    isArticle,
    // 文章或者评论的ID
    source,
    // 做分页使用，记录最后一条ID，初次使用的时候传null
    offset = null,
    // 获取几条数据
    limit = 10
}) => {
    // a是文章的评论，c是评论的评论
    return request.get('/app/v1_0/comments', {
        params: {
            type: isArticle ? 'a' : 'c',
            source,
            offset,
            limit
        }
    });
};
