import request from '@/utils/request.js';

export const login = ({ mobile, code }) => {
    return request.post('/app/v1_0/authorizations', {
        mobile, code
    });
};
// 拉黑作者
export const blackUserList = (id) => {
    return request.post('/app/v1_0/user/blacklists', {
        target: id
    });
};

/**
 * 关注用户
 */
export const UnFollowUser = (id) => {
    return request.post('/app/v1_0/user/followings', {
        target: id
    });
};
/**
 * 取消关注用户
 */
export const followUser = (id) => {
    return request.delete(`/app/v1_0/user/followings/${id}`);
};
